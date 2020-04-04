const express = require("express");
const authMiddleware = require("./middleware/auth");
const SessionController = require("./controllers/SessionController");
const FeiranteController = require("./controllers/FeiranteController");
const RegioesController = require("./controllers/RegioesController");

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://ifeira:LP979Riar3B6HTKS@cluster0-uybm2.gcp.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url);
const dbName = "ifeira";

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

class IFeiraWS {
  #express;

  constructor() {
    this.#express = express();
    this.#middlewares();
    this.#routes();
  }

  get express() {
    // precisa expor o express para usar nos testes
    return this.#express;
  }

  ouvir(porta) {
    if (!/^\d+$/.test(porta)) {
      throw new TypeError("Porta informada deve ser numérica");
    }
    this.#express.listen(porta);
  }

  #middlewares = () => {
    this.#express.use(express.json());
  };

  #routes = () => {
    const routes = express.Router();
    this.#express.use(routes);

    routes.get(
      "/feirantes/bairro/idBairro",
      FeiranteController.listarPorBairro
    );

    routes.get("/feirante/id", FeiranteController.ler);

    routes.get("/estados", RegioesController.listarEstados);

    routes.put(
      "/municipios/idEstado",
      RegioesController.listarMunicipiosPorEstado
    );
    routes.put(
      "/bairros/idMunicipio",
      RegioesController.listarBairrosPorMunicipio
    );

    routes.post("/sessions", SessionController.store);

    // middleware aplicado para as rotas abaixo
    routes.use(authMiddleware);

    routes.post("/feirante", FeiranteController.gravar);
    routes.put("/feirante/id", FeiranteController.atualizar);
    routes.get("/painel/", FeiranteController.dadosPainel);
  };
}

module.exports = IFeiraWS;
