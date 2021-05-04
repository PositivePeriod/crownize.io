var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

class DBManager {
    constructor() {
        var adapter = new FileSync('database/db.json');
        this.db = low(adapter);
        this.db.defaults({ users: [], games: [] }).write();

        this.saltOrRounds = 10;
    }

    existID(id) {
        return getUserByID(id) ? true : false;
        
    }

    getUserByID(id) {
        var user = this.db.get('users').find({ id: id }).value();
        return user
    }

    getUserPWByUserID(userID) {
        var user = this.db.get('users').find({ userID: userID }).value();
        return user.userPW
    }

    addNewUser(data) {
        bcrypt.hash(data.password, this, this.saltOrRounds, function(err, hashedPW) {
            var user = {
                id: shortid.generate(),
                userID: data.identity,
                userPW: hashedPW,
                name: data.name
            };
            db.get('users').push(user).write();
        });
    }
}

module.exports = DBManager;