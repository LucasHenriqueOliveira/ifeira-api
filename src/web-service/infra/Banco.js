const { MongoClient } = require("mongodb");

class Banco {

    static uri = "mongodb+srv://ifeira:LP979Riar3B6HTKS@cluster0-uybm2.gcp.mongodb.net/test?retryWrites=true&w=majority";
    static dbName = "ifeira";

    static async encontrarDocumentos(collectionName, filtro = {}){

      if(typeof collectionName !== "string" || !collectionName){
        throw new TypeError("Collectionstring não informada corretamente");
      }
      if(typeof filtro !== "object"){
        throw new TypeError("Filtro informado não é um objeto");
      }

      let client;
      let docs;
      try{
        client = await MongoClient.connect(Banco.uri);
      }
      catch(e){
        throw new Banco.erros.ErroNaConexaoDoBanco(e);
      }
      try{
        const collection = client.db(Banco.dbName).collection(collectionName);
        const cursor = collection.find(filtro);
        docs = await cursor.toArray();
      }
      catch(e){
        throw new Banco.erros.ErroNaConsultaAoBanco(e);
      }
      await client.close();
      return docs;

    }

}

class ErroNaConexaoDoBanco extends Error{

  code = "ERRO_NA_CONEXAO_DO_BANCO";

  constructor(erro){
    super("Erro ao conectar no banco de dados");
    this.erro = erro;
  }

}

class ErroNaConsultaAoBanco extends Error{

  code = "ERRO_NA_CONSULTA_AO_BANCO";

  constructor(erro){
    super("Erro na consulta ao banco de dados");
    this.erro = erro;
  }

}

Banco.erros = {ErroNaConexaoDoBanco, ErroNaConsultaAoBanco};


module.exports = Banco;