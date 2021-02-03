module.exports = Object.freeze({
    INFO: {
        SITE_URL: "localhost:3000/",
        CONTACT: "positiveperiod.dev@gmail.com"

    },

    GAME_OPTION: {
        TURN_IN_MILLISECOND: 500,

        TURN_FOR_KING_UNIT: 2,
        TURN_FOR_CITY_UNIT: 5,
        TURN_FOR_PLAIN_UNIT: 25,
        TURN_FOR_SWAMP_UNIT: 2,

        COST_FOR_CASTLE: 40,
        COST_FOR_BARRIER: 70,

        MAP_SIZE: 10
    },

    MSG_TYPES: {
        CONNECT_SERVER: 'connect',
        DISCONNECT_SERVER: 'disconnect',

        JOIN_LOBBY: 'join_lobby',
        LEAVE_LOBBY: 'leave_lobby',

        JOIN_ROOM: 'join_room',
        LEAVE_ROOM: 'leave_room',

        SEND_COMMAND: 'command',
        SEND_CHAT: 'chat',


        JOIN_GAME: 'join_game',
        GAME_UPDATE: 'update',
        INPUT: 'input',
        GAME_OVER: 'dead',
    },

    COLORS: {
        "red": "#ff0000",
        "green": "#008000",
        "blue": "#0000ff",
        "purple": "#800080",
        "teal": "#008080",
        "lightblue": "#4363d8",
        "orange": "#f58231",
        "maroon": "#800000",
        "yellow": "#b09f30",
        "pink": "#f032e6",
        "brown": "#9a6324",
        "lightgreen": "#7ab78c"
    }
});