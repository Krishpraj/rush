/**
 * Main entry point - Bootstrap the game
 * Initializes all systems and wires up UI callbacks
 */

(async function main() {
    const ui = new UIManager();
    const network = new NetworkManager();
    const game = new Game();

    // Loading sequence
    ui.setLoadingProgress(10, 'Initializing engine...');

    try {
        await game.init(ui, network);
        ui.setLoadingProgress(40, 'Loading physics...');

        // Initialize PeerJS
        ui.setLoadingProgress(60, 'Connecting to network...');
        const name = localStorage.getItem('rush_name') || '';
        const color = localStorage.getItem('rush_color') || '#ff3333';
        document.getElementById('player-name').value = name;
        if (color) {
            document.querySelectorAll('.color-option').forEach(el => {
                if (el.dataset.color === color) {
                    document.querySelectorAll('.color-option').forEach(e => e.classList.remove('selected'));
                    el.classList.add('selected');
                    ui.selectedColor = color;
                }
            });
        }

        await network.init(name || 'Player', color);
        window._currentPeerId = network.peerId;

        ui.setLoadingProgress(90, 'Preparing tracks...');

        // Simulate a slight delay for UX
        await new Promise(r => setTimeout(r, 500));

        ui.setLoadingProgress(100, 'Ready!');
        await new Promise(r => setTimeout(r, 300));

        // Show main menu
        ui.showScreen('mainMenu');

    } catch (err) {
        console.error('Init failed:', err);
        ui.setLoadingProgress(100, 'Error loading. Please refresh.');
        return;
    }

    // --- Wire up UI callbacks ---

    // Solo race
    ui.onSoloRace = async (trackId, playerName, carColor) => {
        _savePrefs(playerName, carColor);
        game.playerName = playerName;
        game.carColor = carColor;
        game.isMultiplayer = false;
        network.playerName = playerName;
        network.carColor = carColor;
        ui.hideAllScreens();
        await game.startRace(trackId);
    };

    // Create party
    ui.onCreateParty = async (playerName, carColor) => {
        _savePrefs(playerName, carColor);
        network.playerName = playerName;
        network.carColor = carColor;
        game.playerName = playerName;
        game.carColor = carColor;
        game.isMultiplayer = true;

        try {
            const data = await network.createParty(ui.selectedTrack);
            ui.showScreen('partyLobby');
            ui.updatePartyLobby(data.party);
        } catch (err) {
            alert('Failed to create party. Is the server running?');
        }
    };

    // Join party
    ui.onJoinParty = async (code, playerName, carColor) => {
        _savePrefs(playerName, carColor);
        network.playerName = playerName;
        network.carColor = carColor;
        game.playerName = playerName;
        game.carColor = carColor;
        game.isMultiplayer = true;

        try {
            const data = await network.joinParty(code);
            ui.showScreen('partyLobby');
            ui.updatePartyLobby(data.party);
        } catch (err) {
            ui.showJoinError(err.message || 'Failed to join party');
        }
    };

    // Start race from lobby
    ui.onStartRace = async () => {
        const party = await network.getParty();
        if (!party) return;
        game.trackId = party.track_id;
        await network.startRace();
        ui.hideAllScreens();
        await game.startRace(party.track_id);
    };

    // Leave party
    ui.onLeaveParty = async () => {
        await network.leaveParty();
        game.isMultiplayer = false;
        ui.showScreen('mainMenu');
    };

    // Track selected in party
    ui.onTrackSelected = (trackId) => {
        network.changeTrack(trackId);
    };

    // Pause/Resume
    ui.onResumeGame = () => {
        game.resumeGame();
    };

    ui.onRestartGame = () => {
        game.restartRace();
    };

    ui.onQuitToMenu = () => {
        game.quitToMenu();
    };

    ui.onRaceAgain = () => {
        game.restartRace();
    };

    // Leaderboard loading
    ui._loadLeaderboard = async (filter) => {
        const data = await network.getLeaderboard(filter);
        ui.updateLeaderboard(data.leaderboard || []);
    };

    // Handle race start from network (non-host)
    network.onRaceStart = async (data) => {
        if (game.state !== 'racing') {
            const party = await network.getParty();
            if (party) {
                game.trackId = party.track_id;
                ui.hideAllScreens();
                await game.startRace(party.track_id);
            }
        }
    };

    function _savePrefs(name, color) {
        localStorage.setItem('rush_name', name);
        localStorage.setItem('rush_color', color);
    }

    console.log('[Rush Racing] Game ready!');
})();
