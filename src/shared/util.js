function getRandomInt(min, max) {
    var minInt = Math.ceil(min);
    var maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

function getRandomHexColor() {
    return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function shuffleArray(array) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports = {
    getRandomInt: getRandomInt,
    getRandomHexColor: getRandomHexColor,
    shuffleArray: shuffleArray
};