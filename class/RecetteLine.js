var request = require("request");
const { Manager } = require("./Manager");

class RecetteLine extends Manager {
    constructor() {
        super("recetteline");
    }
}

module.exports = {
    RecetteLine
}