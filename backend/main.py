"""
Rush Racing - FastAPI Backend
Handles party management, matchmaking, and leaderboard
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import random
import string
import time
import os

app = FastAPI(title="Rush Racing API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-memory storage ---
parties: dict = {}
leaderboard: list = []
players_online: dict = {}


# --- Models ---
class CreatePartyRequest(BaseModel):
    host_name: str
    host_peer_id: str
    host_player_id: Optional[str] = None
    track_id: str = "track_1"
    max_players: int = 6
    car_color: str = "#ff3333"


class JoinPartyRequest(BaseModel):
    player_name: str
    player_peer_id: str
    player_id: Optional[str] = None
    car_color: str = "#3333ff"


class LeaderboardEntry(BaseModel):
    player_name: str
    track_id: str
    lap_time: float
    total_time: float
    laps: int = 3


class PlayerOnlineRequest(BaseModel):
    player_name: str
    peer_id: str


# --- Helper ---
def generate_party_code(length=5):
    """Generate a unique party code."""
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
        if code not in parties:
            return code


# --- Party Endpoints ---
@app.post("/api/party/create")
def create_party(req: CreatePartyRequest):
    code = generate_party_code()
    host_player_id = req.host_player_id or req.host_peer_id
    parties[code] = {
        "code": code,
        "host_name": req.host_name,
        "host_peer_id": req.host_peer_id,
        "host_player_id": host_player_id,
        "track_id": req.track_id,
        "max_players": req.max_players,
        "players": [
            {
                "player_id": host_player_id,
                "name": req.host_name,
                "peer_id": req.host_peer_id,
                "car_color": req.car_color,
                "is_host": True,
                "ready": False,
            }
        ],
        "state": "waiting",
        "created_at": time.time(),
    }
    return {"code": code, "party": parties[code]}


@app.post("/api/party/{code}/join")
def join_party(code: str, req: JoinPartyRequest):
    code = code.upper()
    if code not in parties:
        raise HTTPException(status_code=404, detail="Party not found")
    party = parties[code]
    incoming_player_id = req.player_id or req.player_peer_id

    # Refresh/reconnect: if this logical player already exists, update peer + profile.
    for p in party["players"]:
        if p.get("player_id") == incoming_player_id:
            old_peer_id = p.get("peer_id")
            p["name"] = req.player_name
            p["peer_id"] = req.player_peer_id
            p["car_color"] = req.car_color
            if p.get("is_host"):
                party["host_name"] = p["name"]
                party["host_peer_id"] = p["peer_id"]
                party["host_player_id"] = p.get("player_id")
            # Keep previous ready state only if peer did not change.
            if old_peer_id != req.player_peer_id:
                p["ready"] = False
            return {"party": party}

    if party["state"] != "waiting":
        raise HTTPException(status_code=400, detail="Race already in progress")
    if len(party["players"]) >= party["max_players"]:
        raise HTTPException(status_code=400, detail="Party is full")

    for p in party["players"]:
        if p["peer_id"] == req.player_peer_id:
            p["name"] = req.player_name
            p["car_color"] = req.car_color
            return {"party": party}
    party["players"].append(
        {
            "player_id": incoming_player_id,
            "name": req.player_name,
            "peer_id": req.player_peer_id,
            "car_color": req.car_color,
            "is_host": False,
            "ready": False,
        }
    )
    return {"party": party}


@app.get("/api/party/{code}")
def get_party(code: str):
    code = code.upper()
    if code not in parties:
        raise HTTPException(status_code=404, detail="Party not found")
    return {"party": parties[code]}


@app.post("/api/party/{code}/ready/{peer_id}")
def toggle_ready(code: str, peer_id: str):
    code = code.upper()
    if code not in parties:
        raise HTTPException(status_code=404, detail="Party not found")
    for p in parties[code]["players"]:
        if p["peer_id"] == peer_id:
            p["ready"] = not p["ready"]
            return {"party": parties[code]}
    raise HTTPException(status_code=404, detail="Player not found")


@app.post("/api/party/{code}/start")
def start_race(code: str):
    code = code.upper()
    if code not in parties:
        raise HTTPException(status_code=404, detail="Party not found")
    parties[code]["state"] = "racing"
    return {"party": parties[code]}


@app.post("/api/party/{code}/finish")
def finish_race(code: str):
    code = code.upper()
    if code not in parties:
        raise HTTPException(status_code=404, detail="Party not found")
    parties[code]["state"] = "finished"
    return {"party": parties[code]}


@app.delete("/api/party/{code}/leave/{peer_id}")
def leave_party(code: str, peer_id: str):
    code = code.upper()
    if code not in parties:
        raise HTTPException(status_code=404, detail="Party not found")
    party = parties[code]
    # Accept either transient peer_id or stable player_id.
    party["players"] = [
        p
        for p in party["players"]
        if p.get("peer_id") != peer_id and p.get("player_id") != peer_id
    ]
    if len(party["players"]) == 0:
        del parties[code]
        return {"message": "Party dissolved"}
    # If host left, assign new host
    if not any(p["is_host"] for p in party["players"]):
        party["players"][0]["is_host"] = True
        party["host_name"] = party["players"][0]["name"]
        party["host_peer_id"] = party["players"][0]["peer_id"]
        party["host_player_id"] = party["players"][0].get("player_id")
    return {"party": party}


@app.post("/api/party/{code}/track")
def change_track(code: str, track_id: str):
    code = code.upper()
    if code not in parties:
        raise HTTPException(status_code=404, detail="Party not found")
    parties[code]["track_id"] = track_id
    return {"party": parties[code]}


# --- Leaderboard ---
@app.post("/api/leaderboard")
def submit_time(entry: LeaderboardEntry):
    record = {
        "player_name": entry.player_name,
        "track_id": entry.track_id,
        "lap_time": round(entry.lap_time, 3),
        "total_time": round(entry.total_time, 3),
        "laps": entry.laps,
        "submitted_at": time.time(),
    }
    leaderboard.append(record)
    leaderboard.sort(key=lambda x: x["total_time"])
    if len(leaderboard) > 500:
        leaderboard[:] = leaderboard[:500]
    return {"rank": next(
        (i + 1 for i, e in enumerate(leaderboard) if e is record), len(leaderboard)
    )}


@app.get("/api/leaderboard")
def get_leaderboard(track_id: Optional[str] = None, limit: int = 50):
    filtered = leaderboard
    if track_id:
        filtered = [e for e in leaderboard if e["track_id"] == track_id]
    return {"leaderboard": filtered[:limit]}


# --- Online players ---
@app.post("/api/players/online")
def player_online(req: PlayerOnlineRequest):
    players_online[req.peer_id] = {
        "name": req.player_name,
        "peer_id": req.peer_id,
        "last_seen": time.time(),
    }
    return {"online_count": len(players_online)}


@app.get("/api/players/online")
def get_online_players():
    # Clean up stale players (last seen > 60 seconds ago)
    now = time.time()
    stale = [pid for pid, p in players_online.items() if now - p["last_seen"] > 60]
    for pid in stale:
        del players_online[pid]
    return {"players": list(players_online.values()), "count": len(players_online)}


# --- Serve frontend ---
frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.exists(frontend_path):
    # Mount static files (css, js, assets)
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")


# --- Cleanup old parties ---
@app.on_event("startup")
async def cleanup_task():
    import asyncio

    async def cleanup_loop():
        while True:
            await asyncio.sleep(300)
            now = time.time()
            stale_codes = [
                code for code, p in parties.items()
                if now - p["created_at"] > 3600
            ]
            for code in stale_codes:
                del parties[code]

    asyncio.create_task(cleanup_loop())


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
