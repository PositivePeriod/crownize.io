const { COLORS } = require("../shared/constants");
const InputDeque = require("../shared/deque");
const { shuffleArray } = require("../shared/util");


class Player {
    constructor(account, tempID, color) {
        this.id = account.id;
        this.username = account.username;

        this.tempID = tempID;
        this.color = color;
        this.commandDeque = new InputDeque();
    }

    set command(command) {
        this.commandDeque.push(command);
    }

    get command() {
        return this.commandDeque.pop();
    }

}

class GameManager {
    constructor(accounts, mapData) {
        const colorList = shuffleArray(Object.keys(COLORS));
        this.players = accounts.map((account, index) => { new Player(account, index, colorList[index]) });

        // get mapData from database?
        this.gameMap = new gameMap(mapData);
        this.turn = 0;

    }

    start() {

    }

    gameUpdate() {

        // updateCommand
        

        // updateUnit()
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.map[i][j].updateUnit(this.turn);
            }
        }

    }

    processCommand(command) {
        var [player, commandtype] = command;
    }

    receiveCommand(command) {
        this.commandDeque.push(command);
    }


    sendUpdate();



}
module.exports = GameManager;