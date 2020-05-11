const Banco = require("../infra/Banco");

class TipoProdutoController {
  async listar(req, res) {
    try {
      const docs = await Banco.encontrarDocumentosFind("tiposProdutos");
      res.json(docs);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: e.message });
    }
  }
}

module.exports = new TipoProdutoController();
