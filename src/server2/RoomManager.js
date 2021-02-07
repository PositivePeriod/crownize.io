const GameManager = require("./gameManager");

class RoomManager {
    constructor(id) {
        this.id = id;

        this.accounts = [];
        this.maxNumAccount = 8;
        this.status = null;

        this.gameManager;
    }

    isFull() {
        return this.accounts.length >= this.maxNumAccount;
    }

    addAccount(account) {
        if (!this.isFull) {
            this.accounts.push(account);
            return true
        } else { return false }
    }

    hasAccount(account) {
        return this.accounts.includes(account)
    }

    removeAccount(account) {
        var index = this.accounts.indexOf(account);
        if (index !== -1) {
            this.accounts.pop(index);
        }
    }

    wait() {
        this.status = 'waiting';
        // Try to start
    }

    start() {
        this.status = 'playing';
        this.gameManager = new GameManager(this.accounts);

    }

    get info() {
        return {
            id: this.id,
            current: this.accounts.length,
            max: this.maxNumAccount,
            status: this.status
        }
    }
}
module.exports = RoomManager;