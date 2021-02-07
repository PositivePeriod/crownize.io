const logger = require('../../config/winston');

class uniqueID {
    constructor(name, length) {
        this.name = name;

        this.idList = [];
        this.length = length;
        this.possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    get random() {
        var text = "";
        for (var i = 0; i < this.length; i++) {
            var randomIndex = Math.floor(Math.random() * this.possible.length);
            text += this.possible.charAt(randomIndex);
        }
        return text;
    }

    get() {
        var loop = 0;

        while (true) {
            var randomID = this.random();
            if (this.idList.includes(randomID)) {
                loop++;
                if (loop > 3) {
                    logger.warn(`uniqueID is hard to make ; ${this.name}`);
                }
            } else {
                this.idList.push(randomID);
                return randomID;
            }
        }
    }

    expire(id) {
        var index = this.idList.indexOf(id);
        if (index !== -1) {
            this.idList.splice(index, 1);
        }
    }
}

module.exports = uniqueID;