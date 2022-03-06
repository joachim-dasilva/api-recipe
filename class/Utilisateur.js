var request = require("request");
const { Manager } = require("./Manager");
const { Recette } = require("./Recette");

class Utilisateur extends Manager {
    /**
     * _id
     * login
     * password (sha256)
     * 
     * recettesLiked[]
     */
    constructor() {
        super("utilisateur");
    }

    async like(user, recette) {
        const recetteManager = new Recette();
        const data = await this.find(user);
        const newData = { recettesLiked: data.recettesLiked };
        newData.recettesLiked.push(await recetteManager.find(recette));
        return await this.update(id, newData);
    }
}

module.exports = {
    Utilisateur
}