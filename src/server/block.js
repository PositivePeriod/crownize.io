const Constants = require('../shared/constants');

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

    changeType(type) {
        this.type = type;
    }

    updateUnit(turn) {
        if (this.player !== null) {
            switch (this.type) {
                case "King":
                    if (turn % Constants.TURN_FOR_KING_UNIT === 0) {
                        this.unit++;
                    }
                    break;
                case "City":
                    if (turn % Constants.TURN_FOR_CITY_UNIT === 0) {
                        this.unit++;
                    }
                    break;
                case "Plain":
                    if (turn % Constants.TURN_FOR_PLAIN_UNIT === 0) {
                        this.unit++;
                    }
                    break;
                case "Swamp":
                    if (turn % Constants.TURN_FOR_SWAMP_UNIT === 0) {
                        this.unit--;
                    }
                    break;
                case "Wild":
                case "Mountain":
                    break;
                default:
                    console.log('block.js | updateUnit | Cannot reach here'+this.type)
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
            return;
        }
        if (this.unit > unit) {
            this.unit -= unit;
        } else if (this.unit === unit) {
            this.beNeutralized();
        } else if (this.unit < unit) {
            this.beDominated(player, unit);
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
            username: this.player !== null ? this.player.username : null
        }
    }
}

module.exports = Block;