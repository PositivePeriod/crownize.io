class Player {
    constructor(id, username, color, king) {
        this.id =id;
        this.username = username;
        this.color = color;

        this.land = [];
        this.king;
        this.initKing(king);
    }

    initKing(block) {
        this.king = block;
        this.winLand(block);
        console.log('initking| ', this.king.player);
        console.log('initking| ', this.king.player===this);
    }

    getNumberOfLand() {
        return this.land.length;
    }

    winLand(block) {
        this.land.push(block);
        block.player = this;
    }

    loseLand(block) {
        var pos = this.land.indexOf(block);
        if (pos !== -1) {
            this.land.splice(pos, 1);
        }
    }

    getTotalUnit() {
        var reducer = (value, land) => value+land.unit;
        return this.land.reduce(reducer, 0);
    }

    isAlive() {
        return this.king.player === this;
    }

    beDominated() {
        this.king.changeType("City");
        this.land.forEach(block => {
            this.king.player.winLand(block);
        });
    }
}

module.exports = Player;