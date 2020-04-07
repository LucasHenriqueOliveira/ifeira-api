const Banco = require('../infra/Banco');

class RegioesController {

  async listarEstados(req, res) {

    try{
      const docs = await Banco.encontrarDocumentos("municipios");
      res.json(docs);
    }
    catch(e){
      console.log(e);
      res.status(500).send();
    }

  }

  async listarMunicipiosPorEstado(req, res) {

    const {uf} = req.params;

    try{
      const docs = await Banco.encontrarDocumentos("municipios", {uf});
      res.json(docs);
    }
    catch(e){
      console.log(e);
      res.status(500).send();
    }

  }

  async listarBairrosPorMunicipio(req, res) {

    const {idMunicipio} = req.params;

    try{
      const docs = await Banco.encontrarDocumentos("bairros", {municipio: idMunicipio});
      res.json(docs);
    }
    catch(e){
      console.log(e);
      res.status(500).send();
    }

  }

}

module.exports = new RegioesController();
