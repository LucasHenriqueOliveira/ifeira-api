require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');

class IFeiraWS {

    #express;

    constructor(){
        this.#express = express();
        this.middlewares();
        this.routes();
    }

    get express(){
        // precisa expor o express para usar nos testes
        return this.#express;
    }

    ouvir(porta){
        if(!/^\d+$/.test(porta)){
            throw new TypeError("Porta informada deve ser numérica");
        }
        this.express.listen(porta);
    }

    middlewares(){
        this.express.use(express.json());
    }

    routes(){
        this.express.use(require('./routes'));
    }

}

module.exports = IFeiraWS;