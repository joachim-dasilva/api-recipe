var request = require("request");
const { Manager } = require("./Manager");
const { RecetteLine } = require("./RecetteLine");

class Recette extends Manager {
    /**
     * _id
     * nom
     * description
     * nbPersonne
     * time (minutes)
     * level
     * like
     * 
     * lines[]
     * - text
     * - qte
     * - typeQte
     */
    constructor() {
        super("recette");
    }

    /**
     * save all recette lines first
     */
    async save(data) {
        const recetteLineManager = new RecetteLine();
        const dataLines = data.lines;
        data.lines = [];
        for (const line of dataLines) {
            data.lines.push(await recetteLineManager.save(line));
        }
        return await super.save(data);
    }

    /**
     * 
     * delete all recette lines first
     */
    async delete(id) {
        const recetteLineManager = new RecetteLine();
        const lines = await this.find(id);
        for (const line of lines) {
            await recetteLineManager.delete(line._id);
        }
        return await super.delete(id);
    }

    async like(id) {
        const data = await this.find(id);
        const newData = { like: Number(data.like) + 1 };
        return await this.update(id, newData);
    }

    async unlike(id) {
        const data = await this.find(id);
        const newData = { like: Number(data.like) - 1 };
        return await this.update(id, newData);
    }
}

module.exports = {
    Recette
}