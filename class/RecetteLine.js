var request = require("request");
const { Manager } = require("./Manager");

class RecetteLine extends Manager {
    /**
     * text
     * qte
     * typeQte
     */
    constructor() {
        super("recetteline");
    }
}

module.exports = {
    RecetteLine
}