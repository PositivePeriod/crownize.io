const uniqueID = require('../shared/uid');
const RoomManager = require('./RoomManager')

class LobbyManager {
    constructor() {
        this.rooms = new Map;
        this.roomUID = uniqueID('room-name', 4);
    }

    addRoom() {
        var roomID = this.roomUID.get();
        var newRoom = new RoomManager(roomID);
        this.rooms.set(roomID, newRoom);
        return roomID
    }

    joinRoom(account, roomID) {
        if (!this.rooms.has(roomID)) { return false }
        var room = this.rooms.get(roomID);
        if (!room.isFull()) { return false }
        room.addAccount(account);
        return true
    }

    leaveRoom(account) {
        

    }

    removeRoom(roomID) {
        this.rooms.delete(roomID);
        this.roomID.expire(room.id);
    }


    get info() {
        return Object.keys(this.rooms).map(room => room.info);
    }
}
module.exports = LobbyManager;