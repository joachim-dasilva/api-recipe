class RecetteLine {
    static next_id = 1;

    constructor(text, qte) {
        this.id = RecetteLine.next_id;
        this.text = text;
        this.qte = qte;

        RecetteLine.next_id++;
    }

    setQte(qte){
        this.qte = qte;
    }
}

module.exports = {
    RecetteLine
}