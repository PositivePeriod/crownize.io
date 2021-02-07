const { GAME_OPTION } = require('../shared/constants');

class Block {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.unit = 0;
        this.player = null;
    }

    setUnit(unit) {
        this.unit = unit;
    }

    setType(type) {
        this.type = type;
    }

    updateUnit(turn) {
        if (this.player !== null) {
            switch (this.type) {
                case "King":
                case "City":
                case "Plain":
                    if (turn % GAME_OPTION.TURN_FOR[this.type.toUpperCase()] === 0) {
                        this.unit++;
                    }
                    break;
                case "Swamp":
                case "Wild":
                case "Mountain":
                    if (turn % GAME_OPTION.TURN_FOR[this.type.toUpperCase()] === 0) {
                        this.unit--;
                    }
                    break;
                default:
                    console.warn('block.js | updateUnit | Cannot reach here' + this.type)
                    break;
            }
        }
    }

    beDominated(player, unit) {
        this.unit = unit - this.unit;
        this.player = player;
        this.player.winLand(this);
    }

    beNeutralized() {
        this.unit = 0;
        if (this.player !== null) {
            this.player.loseLand(this);
            this.player = null;
        }
    }

    enterUnit(player, unit) {
        if (this.player === player) {
            this.unit += unit;
        } else {
            if (this.unit > unit) {
                this.unit -= unit;
            } else if (this.unit === unit) {
                this.beNeutralized();
            } else if (this.unit < unit) {
                this.beDominated(player, unit);
            }
        }
    }

    leaveUnit(unit) {
        this.unit -= unit;
    }

    getMovableUnit() {
        return Math.max(this.unit - 1, 0)
    }

    getView() {
        return {
            type: this.type,
            unit: this.unit,
            username: this.player !== null ? this.player.username : null // TODO TODO TODO
        }
    }
}

module.exports = Block;