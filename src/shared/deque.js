class InputDeque {
    constructor() {
        this.reset();
    }

    reset() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pull() {
        this.items.pop();
    }

    pop() {
        return this.items.shift() || null;
    }

    getSize() {
        return this.items.length;
    }

    isEmpty() {
        return this.getSize() === 0;
    }
}

module.exports = InputDeque;