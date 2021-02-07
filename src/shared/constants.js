const INFO = {
    DEVELOPER: "PositivePeriod",
    SITE_URL: "localhost:3000/",
    CONTACT: "positiveperiod.dev@gmail.com"
};

const GAME_OPTION = {
    MAP_SIZE: 10,
    TURN_IN_MILLISECOND: 500,

    TURN_FOR: {
        KING: 2,
        CITY: 5,
        PLAIN: 25,
        SWAMP: 2,
        WILD: Number.POSITIVE_INFINITY,
        MOUNTAIN: Number.POSITIVE_INFINITY
    },

    COST_FOR_CASTLE: 40,
    COST_FOR_BARRIER: 70,
};

const MSG = {
    CONNECT_SERVER: 'connection',
    VERIFY_SERVER: 'verify',
    DISCONNECT_SERVER: 'disconnect',

    JOIN_LOBBY: 'join_lobby',

    JOIN_ROOM: 'join_room',
    LEAVE_ROOM: 'leave_room',

    UPDATE_GAME: 'update_game',
};

const MSG_TYPES = {
    CONNECT_SERVER: 'connection',
    DISCONNECT_SERVER: 'disconnect',

    JOIN_LOBBY: 'join_lobby',

    JOIN_ROOM: 'join_room',
    LEAVE_ROOM: 'leave_room',

    SEND_COMMAND: 'send_command',
    UPDATE_GAME: 'update_game',

    // Finish
    SEND_COMMAND: 'command',
    SEND_CHAT: 'chat',

    JOIN_GAME: 'join_game',

    GAME_UPDATE: 'update',
    GAME_OVER: 'dead',
    INPUT: 'input',

};

const COLORS = {
    red: "#ff0000",
    green: "#008000",
    blue: "#0000ff",
    purple: "#800080",
    teal: "#008080",
    lightblue: "#4363d8",
    orange: "#f58231",
    maroon: "#800000",
    yellow: "#b09f30",
    pink: "#f032e6",
    brown: "#9a6324",
    lightgreen: "#7ab78c"
};

module.exports = {
    INFO: Object.freeze(INFO),
    GAME_OPTION: Object.freeze(GAME_OPTION),
    MSG: Object.freeze(MSG),
    MSG_TYPES: Object.freeze(MSG_TYPES),
    COLORS: Object.freeze(COLORS)
};