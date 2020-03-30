require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
const express = require('express');
const authMiddleware = require('./app/middleware/auth');
const SessionController = require('./app/controllers/SessionController');
const FeiranteController = require('./app/controllers/FeiranteController');
const RegioesController = require('./app/controllers/RegioesController');

class IFeiraWS {

    #express;

    constructor(){
        this.#express = express();
        this.#middlewares();
        this.#routes();
    }

    get express(){
        // precisa expor o express para usar nos testes
        return this.#express;
    }

    ouvir(porta){
        if(!/^\d+$/.test(porta)){
            throw new TypeError("Porta informada deve ser numérica");
        }
        this.#express.listen(porta);
    }

    #middlewares = ()=>{
        this.#express.use(express.json());
    }

    #routes = ()=>{
        const routes = express.Router();
        this.#express.use(routes);
        
        routes.post('/sessions', SessionController.store);
        
        // middleware aplicado para as rotas abaixo
        routes.use(authMiddleware);
        
        routes.post('/feirante', FeiranteController.gravar);
        routes.get('/feirante/id', FeiranteController.ler);
        routes.put('/feirante/id', FeiranteController.atualizar);
        routes.get('/feirantes/bairro/idBairro', FeiranteController.listarPorBairro);
        routes.put('/municipios/idEstado', RegioesController.listarMunicipiosPorEstado);
        routes.put('/bairros/idMunicipio', RegioesController.listarBairrosPorMunicipio);
        
    }

}

module.exports = IFeiraWS;