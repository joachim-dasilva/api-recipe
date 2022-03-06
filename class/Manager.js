var request = require("request");

/**
 * url: URL of database restdb
 * key: key API for database
 * options: method (GET, POST, PUT, DELETE) restdb
 * collection: object (Utilisateur, Recette, RecetteLine)
 */
class Manager {
    static url;
    static key;
    options;
    collection;

    constructor(collection) {
        this.options = {};
        this.collection = collection;
    }

    /**
     * 
     * @returns all object of collection
     */
    async findAll() {
        this.options = {
            method: 'GET',
            url: `${Manager.url}rest/${this.collection}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': Manager.key
            }
        };
        return await this.sendRequest();
    }

    /**
    * 
    * @returns object with id
    */
    async find(id) {
        this.options = {
            method: 'GET',
            url: `${Manager.url}rest/${this.collection}/${id}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': Manager.key
            }
        };
        return await this.sendRequest();
    }

    /**
    * save object in db
    * @returns object saved
    */
    async save(data) {
        this.options = {
            method: 'POST',
            url: `${Manager.url}rest/${this.collection}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': Manager.key,
                'content-type': 'application/json'
            },
            body: data,
            json: true
        };
        return await this.sendRequest();
    }

    /**
    * delete object in db
    * @returns object _id deleted
    */
    async delete(id) {
        this.options = {
            method: 'DELETE',
            url: `${Manager.url}rest/${this.collection}/${id}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': Manager.key,
                'content-type': 'application/json'
            }
        };
        return await this.sendRequest();
    }

    /**
    * update object in db
    * @returns object updated
    */
    async update(id, data) {
        this.options = {
            method: 'PUT',
            url: `${Manager.url}rest/${this.collection}/${id}`,
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': Manager.key,
                'content-type': 'application/json'
            },
            body: data,
            json: true
        };
        return await this.sendRequest();
    }

    async sendRequest() {
        return new Promise((resolve, reject) => {
            request(this.options, function (error, response, body) {
                if (error) reject(error);
                if (body instanceof Object) {
                    resolve(body);
                } else resolve(JSON.parse(body));
            });
        });
    }
}

module.exports = {
    Manager
}