const Constants = require('../shared/constants');
const Lobby = require('./lobby');
const GameMap = require('./map');


class Game {
    constructor() {
        this.map = new GameMap(Constants.GAME_OPTION.MAP_SIZE, Constants.GAME_OPTION.MAP_SIZE);
        this.lobby = new Lobby();

        this.tryToAddPlayer = [];
        this.tryToRemovePlayer = [];

        setInterval(this.update.bind(this), Constants.GAME_OPTION.TURN_IN_MILLISECOND);
    }

    handleInput(socket, command) {
        var playerID = socket.id;
        var deque = this.lobby.deques.get(playerID);
        deque.push(command);
    }

    update() {
        this.map.updateTurn();
        this.map.updateUnit();

        if (this.map.turn % 50 === 0) {
            console.log(`Turn ${this.map.turn}`);
        }
        // Update players
        this.tryToAddPlayer.forEach((value) => {
            var [socket, username] = value;
            var king = this.map.makeKing();
            this.lobby.addPlayer(socket, username, king)
        });
        this.tryToRemovePlayer.forEach(socket => { this.lobby.removePlayer(socket) });
        this.tryToAddPlayer = [];
        this.tryToRemovePlayer = [];



        // Apply command
        this.lobby.sockets.forEach((socket, playerID) => {
            const deque = this.lobby.findDeque(playerID);
            var command = deque.pop();
            if (command !== null) {
                const player = this.lobby.findPlayer(playerID);
                this.map.command(player, command.type, command.focus, command.dir);
            }
        });

        // Check dying player
        // TODO 동시에 죽으면? - 먼저 접속이 이김?
        this.lobby.sockets.forEach((socket, playerID) => {
            const player = this.lobby.findPlayer(playerID);
            if (!player.isAlive()) {
                player.beDominated();
                socket.emit(Constants.MSG_TYPES.GAME_OVER);
                this.lobby.removePlayer(socket);
            }
        });

        // Send a game update to each player
        const leaderboard = this.lobby.getLeaderboard();
        const viewMap = this.map.getViewWhole();

        this.lobby.sockets.forEach((socket, playerID) => {
            const player = this.lobby.findPlayer(playerID);

            socket.emit(Constants.MSG_TYPES.GAME_UPDATE, {
                turn: this.map.turn,
                map: this.map.getViewPlayer(player, viewMap),
                leaderboard: leaderboard
            });
        });
    }
}

module.exports = Game;