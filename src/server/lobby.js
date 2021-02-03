const InputDeque = require('../shared/deque');
const Player = require('./player');


class Lobby {
    constructor() {
        this.players = new Map();
        this.sockets = new Map();
        this.deques = new Map();
    }

    addPlayer(socket, username, king) {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        var playerID = socket.id;
        this.sockets.set(playerID, socket);
        this.deques.set(playerID, new InputDeque());
        this.players.set(playerID, new Player(playerID, username, randomColor, king));
        console.log(this.players.get(playerID).color);
    }

    findPlayer(playerID) {
        return this.players.get(playerID);
    }

    findDeque(playerID) {
        return this.deques.get(playerID);
    }

    removePlayer(socket) {
        var playerID = socket.id;
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