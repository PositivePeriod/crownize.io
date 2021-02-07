class Account {
    constructor(socket) {
        this.socket = socket;
        this.verified = false;

        this.username = "Anonymous";
        this.stats = { win: 0, lose: 0 }

        this.player;
        this.tempId;
    }

    login(userID, userPW) {
        // TODO
        var succeed = (database[userID].pw === userPW);
        if (succeed) {
            this.verified = true;

            /* loadData() */
            var data = database[userID];
            this.username = data.name;
            this.stats = { win: 0, lose: 0 };

            return true
        } else {
            return false
        }
    }

    saveData() {
        // TODO
    }

}

module.exports = Account;