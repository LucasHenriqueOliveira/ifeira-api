const Banco = require('../infra/Banco');

class ProdutoController {

    async listar(req, res) {

        try {
            const docs = await Banco.encontrarDocumentos("produtos");
            res.json(docs);
        }
        catch (e) {
            console.log(e);
            res.status(500).send();
        }

    }

}

module.exports = new ProdutoController();