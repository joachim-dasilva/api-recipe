const { RecetteLine } = require('./RecetteLine');

class Recette {
    static next_id = 1;

    constructor(nom, description, nbPersonne = 1, lines = []) {
        this.id = Recette.next_id;
        this.nom = nom;
        this.description = description;
        this.nbPersonne = nbPersonne;
        this.lines = lines;

        Recette.next_id++;
    }

    addLine(txt, qte) {
        const line = new RecetteLine(txt, qte);
        this.lines.push(line);
    }

    setNbPersonne(nbPersonne) {
        const taux = nbPersonne / this.nbPersonne;
        for (const line of this.lines) {
            line.setQte(line.qte * taux);
        }
        this.nbPersonne = nbPersonne;
    }
}

module.exports = {
    Recette
}