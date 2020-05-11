const Banco = require("../infra/Banco");

class RegioesController {
  async listarEstados(req, res) {
    try {
      const docs = await Banco.encontrarDocumentos("municipios");
      return res.json(docs);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }

  async listarMunicipiosPorEstado(req, res) {
    const { uf } = req.params;

    try {
      const docs = await Banco.encontrarDocumentosFind("municipios", {
        uf: uf,
      });
      return res.json(docs);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }

  async listarBairrosPorMunicipio(req, res) {
    const { idMunicipio } = req.params;

    try {
      const docs = await Banco.encontrarDocumentosFind("bairros", {
        municipio: idMunicipio,
      });
      return res.json(docs);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }
}

module.exports = new RegioesController();
