const express = require("express");
const authMiddleware = require("./middleware/auth");
const cors = require("cors");
const SessionController = require("./controllers/SessionController");
const FeiranteController = require("./controllers/FeiranteController");
const RegioesController = require("./controllers/RegioesController");
const TipoProdutoController = require("./controllers/TipoProdutoController");
const ProdutoController = require("./controllers/ProdutoController");

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
    this.#express.use(cors());
  };

  #routes = () => {
    const routes = express.Router();
    this.#express.use(routes);

    routes.post("/sessions", SessionController.store);

    routes.get("/feirante/:idFeirante", FeiranteController.ler);
    routes.get(
      "/feirantes/bairro/:idBairro",
      FeiranteController.listarPorBairro
    );
    routes.get("/regioes/estados", RegioesController.listarEstados);
    routes.get(
      "/regioes/municipios/:uf",
      RegioesController.listarMunicipiosPorEstado
    );
    routes.get(
      "/regioes/bairros/:idMunicipio",
      RegioesController.listarBairrosPorMunicipio
    );

    routes.get("/tiposProdutos", TipoProdutoController.listar);
    routes.get("/produtos", ProdutoController.listar);

    routes.post("/feirante", FeiranteController.gravar);

    // middleware aplicado para as rotas abaixo
    routes.use(authMiddleware);

    routes.put("/feirante/", FeiranteController.atualizar);
  };
}

module.exports = IFeiraWS;
