var request = require("request");
const { Manager } = require("./Manager");

class Utilisateur extends Manager {
    constructor() {
        super("utilisateur");
    }
}

module.exports = {
    Utilisateur
}