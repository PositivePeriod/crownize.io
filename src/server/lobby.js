const InputDeque = require('../shared/deque');
const Player = require('./player');
const { getRandomHexColor } = require('../shared/util');

class Lobby {
    constructor() {
        this.players = new Map();
        this.sockets = new Map();
        this.deques = new Map();
    }

    addPlayer(socket, username, king) {
        const randomColor = getRandomHexColor();
        var playerID = socket.id;
        this.sockets.set(playerID, socket);
        this.deques.set(playerID, new InputDeque());
        this.players.set(playerID, new Player(playerID, username, randomColor, king));
    }

    findPlayer(playerID) {
        return this.players.get(playerID);
    }

    findDeque(playerID) {
        return this.deques.get(playerID);
    }

    removePlayer(socket) {
        var playerID = socket.id;
        var player = this.players.get(playerID);
        if (player.isAlive()) {
            player.beNeutralized();
        }
        try {
            this.sockets.delete(playerID);
            this.deques.delete(playerID);
            this.players.delete(playerID);
        } catch (error) {
            console.error(error);
        }
    }

    getLeaderboard() {
        var unitForEachPlayer = [];
        for (let player of this.players.values()) {
            unitForEachPlayer.push([player.username, player.getTotalUnit(), player.color]);
        }
        return unitForEachPlayer.sort((p1, p2) => p2[1] - p1[1]).slice(0, 5);
    }
}

module.exports = Lobby;