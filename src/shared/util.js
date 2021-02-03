function setHidden(elem, hidden) {
    if (hidden) {
        elem.classList.add('hidden');
    } else {
        elem.classList.remove('hidden');
    }
}

function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    setHidden: setHidden,
    getRandomInt: getRandomInt
};