const Banco = require('../infra/Banco');

class TipoProdutoController {

    async listar(req, res) {

        try {
            const docs = await Banco.encontrarDocumentos("tiposProdutos");
            res.json(docs);
        }
        catch (e) {
            console.log(e);
            res.status(500).send();
        }

    }

}

module.exports = new TipoProdutoController();