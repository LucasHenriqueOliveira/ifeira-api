const ObjectID = require('mongodb').ObjectID;
const Banco = require('../infra/Banco');
// const FeiranteFactory = require("../feirante/FeiranteFactory");

const bcrypt = require("bcryptjs");

class FeiranteController {

  async gravar(req, res) {

    const feirante = req.body;

    debugger;
    if(!feirante.senha){
      // TODO: Melhor usar um model
      res.status(403).json({message: "Senha não informada"});
    }
    const hashSenha = await bcrypt.hash(feirante.senha, 8);
    feirante.senha = hashSenha;

    
    let docs;
    try{
      docs = await Banco.encontrarDocumentos("feirantes", { email: feirante.email });
    }
    catch(e){
      res.status(500).json();
    }
    if(docs.length){
      res.status(403).json({message: "Já consta feirante com o email informado"});
    }

    try{
      await Banco.gravarDocumento("feirantes", feirante);
      res.status(200).send();
    }
    catch(e){
      console.log(e);
      res.status(500).send();
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

  async dadosPainel(req, res) {
    return res.status(200).json({ message: "a implementar" });
  }

  async listarProdutos(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("produtos");
      const p = collection.find({}).toArray(function (err, result) {
        if (err) {
          console.log(err);
        }
        res.json(result);
      });
    } catch (err) {
      console.log(err.stack);
    }
  }

  async listarTiposProdutos(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("tiposProdutos");
      const p = collection.find({}).toArray(function (err, result) {
        if (err) {
          console.log(err);
        }
        res.json(result);
      });
    } catch (err) {
      console.log(err.stack);
    }
  }
  
}

module.exports = new FeiranteController();
