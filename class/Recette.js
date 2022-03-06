var request = require("request");
const { Manager } = require("./Manager");
const { RecetteLine } = require("./RecetteLine");

class Recette extends Manager {
    constructor() {
        super("recette");
    }

    async save(data) {
        const recetteLineManager = new RecetteLine();
        const dataLines = data.lines;
        data.lines = [];
        for (const line of dataLines) {
            data.lines.push(await recetteLineManager.save(line));
        }
        return await super.save(data);
    }
}

module.exports = {
    Recette
}