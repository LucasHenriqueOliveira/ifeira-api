const ObjectID = require('mongodb').ObjectID;
const Banco = require('../infra/Banco');
const NovoFeiranteFactory = require("../models/novoFeirante/NovoFeiranteFactory");

const bcrypt = require("bcryptjs");

class FeiranteController {

  async gravar(req, res) {

    const feirante = await NovoFeiranteFactory.fromObject(req.body);  

    let docs;
    try{
      docs = await Banco.encontrarDocumentos("feirantes", { email: String(feirante.email) });
    }
    catch(e){
      return res.status(500).json();
    }
    if(docs.length){
      return res.status(403).json({message: "Já consta feirante com o email informado"});
    }

    try{
      await Banco.gravarDocumento("feirantes", feirante.document );
      return res.status(200).send();
    }
    catch(e){
      console.log(e);
      return res.status(500).send();
    }

  }

  async ler(req, res) {

    const { idFeirante } = req.params;
    const objId = new ObjectID(idFeirante);

    let docs;
    try{
      docs = await Banco.encontrarDocumentos("feirantes", { _id: objId });
    }
    catch(e){
      res.status(500).send();
    }
    if (!docs.length) {
      return res
        .status(401)
        .json({ message: "Consulta não encontrou feirante com o id informado" });
    }

    if (docs.length > 1) {
      return res
        .status(500)
        .json({ message: "Id retornou mais de um feirante" });
    }

    res.json(docs[0]);

  }

  async atualizar(req, res) {

    const feirante = req.body;

    try{
      await Banco.atualizarDocumento("feirantes", {email: feirante.email}, feirante);
      res.status(200).send();
    }
    catch(e){
      console.log(e);
      // TODO: O que retornar se der erro?
      res.status(500).send();
    }
    
  }

  async listarPorBairro(req, res) {

    const {idBairro} = req.params;
    console.log({idBairro});

    let docs;
    try{
      docs = await Banco.encontrarDocumentos("feirantes", { bairros: idBairro });
      res.json(docs);
    }
    catch(e){
      res.status(500).send();
    }

  }
  
}

module.exports = new FeiranteController();
