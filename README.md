# Rush Racing 🏁


https://github.com/user-attachments/assets/0cfdd41d-6ab2-48d6-b1f6-a9d73c9ae2ac




https://github.com/user-attachments/assets/b6e3ab94-02c2-46a0-ba54-258f747aa954





A multiplayer 3D racing game built with Three.js, Ammo.js physics, and WebRTC peer-to-peer connections.

## Features

- **Multiplayer Racing**: Race against friends in real-time using WebRTC (PeerJS)
- **Physics-Based Driving**: Realistic car physics with Ammo.js (Bullet Physics)
- **Multiple Tracks**: 3 unique race tracks with different layouts
- **Checkpoint System**: Race through gates and track lap times
- **Leaderboard**: Compete for best times
- **Party System**: Create/join racing parties with simple codes
- **Mobile Support**: Touch controls for mobile play
- **Car Customization**: Choose from various car colors

## Tech Stack

- **Three.js** - 3D rendering
- **Ammo.js** - Physics engine (WASM)
- **PeerJS** - WebRTC peer-to-peer
- **FastAPI** - Python backend
- **HTML5/CSS3** - Frontend

## Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Play
Open `http://localhost:8000` in your browser.

## Controls

### Desktop
- **W/↑** - Accelerate
- **S/↓** - Brake/Reverse
- **A/←** - Steer Left
- **D/→** - Steer Right
- **Space** - Handbrake
- **R** - Reset car
- **C** - Change camera

### Mobile
- Left joystick: Steering
- Right buttons: Gas/Brake
