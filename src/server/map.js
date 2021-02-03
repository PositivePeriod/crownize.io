const Block = require('./block');
const Point = require('../shared/point');
const { getRandomInt } = require('../shared/util');
const Constants = require('../shared/constants');

const directions = [
    new Point(-1, -1), new Point(0, -1), new Point(1, -1),
    new Point(-1, 0), new Point(0, 0), new Point(1, 0),
    new Point(-1, 1), new Point(0, 1), new Point(1, 1)
];
class GameMap {
    constructor(width, height, data) {
        this.width = width;
        this.height = height;

        this.turn = 0;
        this.map = Array.from(Array(this.width), () => Array(this.height).fill(null));
        this.initMap(data);
    }

    initMap(data) {
        data = data || Array.from(Array(this.width), () => Array(this.height).fill("Plain"));
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.map[i][j] = new Block(i, j, data[i][j])
            }
        }
    }

    getBlock(point) {
        return this.map[point.x][point.y]
    }

    ownBlock(player, point) {
        return player === this.getBlock(point).player
    }

    withinMap(point) {
        return 0 <= point.x && point.x < Constants.MAP_SIZE && 0 <= point.y && point.y < Constants.MAP_SIZE
    }

    updateTurn() {
        this.turn++;
    }

    updateUnit() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.map[i][j].updateUnit(this.turn);
            }
        }
    }

    command(player, type, focusData, dirData) {
        var focus = new Point(focusData.x, focusData.y);
        var dir = new Point(dirData.x, dirData.y);
        var newFocus = focus.move(dir);
        if (this.commandable(player, focus, newFocus)) {
            console.log('commandable')
            switch (type) {
                case "Click":
                    this.moveAllMovableUnit(player, focus, newFocus);
                    break;
                case "DoubleClick":
                    this.moveHalfMovableUnit(player, focus, newFocus);
                    break;
                case "RightClick":
                    this.buildBarrier(focus, newFocus)
                    break;
                default:
                    console.log("Cannot reach here");
            }
        }
    }

    commandable(player, focus, newFocus) {
        var isOwner = this.ownBlock(player, focus);
        var possibleMove = this.withinMap(focus) && this.withinMap(newFocus);
        var notMountain = this.getBlock(newFocus).type !== "Mountain";
        return isOwner && possibleMove && notMountain
    }

    moveAllMovableUnit(player, focus, newFocus) {
        var unit = this.getBlock(focus).getMovableUnit();
        this.moveUnit(player, unit, focus, newFocus);
    }

    moveHalfMovableUnit(player, focus, newFocus) {
        var unit = this.getBlock(focus).getMovableUnit();
        var halfUnit = Math.ceil(unit / 2);
        this.moveUnit(player, halfUnit, focus, newFocus);
    }

    moveUnit(player, unit, focus, newFocus) {
        this.getBlock(focus).leaveUnit(unit);
        this.getBlock(newFocus).enterUnit(player, unit);
    }

    buildBarrier() {
        // TODO
    }

    getViewWhole() {
        var viewWhole = Array.from(Array(this.width), () => Array(this.height).fill(null));
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                viewWhole[i][j] = this.getBlock(new Point(i, j)).getView();
            }
        }
        return viewWhole;
    }

    getViewPlayer(player, viewWhole) {
        var viewPlayer = Array.from(Array(this.width), () => Array(this.height).fill(null));
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                var point = new Point(i, j);
                if (this.ownBlock(player, point)) {
                    directions.forEach(dir => {
                        const newPoint = point.move(dir);
                        if (this.withinMap(newPoint)) {
                            viewPlayer[newPoint.x][newPoint.y] = { ...viewWhole[newPoint.x][newPoint.y] };
                        }
                    })
                }
            }
        }
        return viewPlayer;
    }

    makeKing() {
        // Very dangerous and have upper bound for join new player
        while (true) {
            var x = getRandomInt(0, this.width);
            var y = getRandomInt(0, this.height);
            var block = this.getBlock(new Point(x, y));
            if (block.type !== "King") {
                block.setUnit(1);
                block.changeType("King");
                return block
            }
        }
    }
}

module.exports = GameMap;