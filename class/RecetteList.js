const { Recette } = require('./Recette');

class RecetteList {
    static list = null;
    
    constructor(){
        this.recettes = [];
    }

    static getInstance(){
        if(this.list) return this.list;
        RecetteList.list = new RecetteList();
        return this.list;
    }

    getRecette(id){
        for(const recette of recettes){
            if(recette.id == id) return recette;
        }
    }
    
    addRecette(nom, description, nbPersonne, lines = []) {
        const recette = new Recette(nom, description, nbPersonne);
        for(const line of lines){
            recette.addLine(line.text, line.qte);
        }
        this.recettes.push(recette);
    }

    setNbPersonneRecette(idRecette, nbPersonne){
        this.recettes[idRecette-1].setNbPersonne(nbPersonne);
    }
}

module.exports = {
    RecetteList
}