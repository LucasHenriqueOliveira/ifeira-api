console.log(process.env.NODE_ENV);
console.log(process.env.BANCO_FEIRANTE_URI);

const Feirante = require("./Feirante");
const Banco = require("./infra/Banco");
const ObjectID = require("mongodb").ObjectID;
const FeiranteFactory = require("./FeiranteFactory");

const { MongoClient } = require("mongodb");

class FeiranteRepository {

  static async gravar(feirante) {

    if (!(feirante instanceof Feirante)) {
      throw new TypeError("Feirante não é uma instância correta");
    }
    const docs = await Banco.encontrarDocumentos("feirantes", {
      email: String(feirante.email),
    });
    if (docs.length) {
      throw new FeiranteRepository.erros.ErroConstaFeiranteComEmailInformado();
    }
    await Banco.gravarDocumento("feirantes", feirante.document);

  }

  static async atualizar(feirante) {

    if (!(feirante instanceof Feirante)) {
      throw new TypeError("Feirante não é uma instância correta");
    }
    await Banco.atualizarDocumento(
      "feirantes",
      { email: String(feirante.email) },
      feirante.document
    );

  }

  static async buscarPorId(id) {

    id = String(id).trim();
    if (!id) {
      throw new TypeError("Id não informado");
    }
    const objId = new ObjectID(id);
    const docs = await Banco.encontrarDocumentos("feirantes", { _id: objId });
    if (docs.length > 1) {
      throw new FeiranteRepository.erros.ErroIdRetornouMaisDeUmFeirante();
    }
    const doc = docs[0];
    delete doc.senha;
    const feirante = await FeiranteFactory.fromObject(doc);
    return feirante;

  }

  static async buscarPorIdBairro(idBairro) {

    idBairro = String(idBairro).trim();

    if (!idBairro) {
      throw new TypeError("idBairro não informado");
    }
    const docs = await Banco.encontrarDocumentos(
      "feirantes",
      { bairrosDeEntrega: idBairro },
      { senha: 0 }
    );

    const feirantes = [];
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];

      //delete doc.senha; // PREOCUPAÇÃO: ter que deletar a senha todo lugar que consultar... se esquecer pode acabar retornando a senha para o front
      // não seria melhor criar um model que não tivesse a senha?

      //const feirante = await FeiranteFactory.fromObject(doc);
      //feirantes.push(feirante);
      feirantes.push(doc);
    }
    return feirantes;

  }

  static async pesquisa(dados) {
    
    let client;
    let docs;
    try {
      client = await MongoClient.connect(Banco.uri);
    } catch (e) {
      throw new Banco.erros.ErroNaConexaoDoBanco(e);
    }
    try {
      const collection = client.db(Banco.dbName).collection("feirantes");
      const cursor = collection.aggregate([{
          $match: { $and: [{ "status": 'ativo' }] }
        }, {
          $lookup: {
            from: "produtos",
            localField: "produtos",
            foreignField: "_id",
            as: "produtos",
          }
        }, {
          $lookup: {
            from: "tiposProdutos",
            localField: "tiposDeProdutos",
            foreignField: "_id",
            as: "tiposDeProdutos",
          }
        }, {
          $lookup: {
            from: "bairros",
            localField: "bairrosDeEntrega",
            foreignField: "_id",
            as: "bairrosDeEntrega",
          }
        }, {
          $match: {
            $and: [
              { "status": 'ativo' },
              { "bairrosDeEntrega.municipio": dados.municipio || '' },
              { "bairrosDeEntrega._id": { $in: [dados.bairro || ''] } },
              { "produtos._id": { $in: [dados.produto || ''] } },
              { "tiposDeProdutos._id": { $in: [dados.tipoDeProduto || ''] } }
            ]
          }
        }, {
          $project: { senha: 0 }
        }]);
        docs = await cursor.toArray();

    } catch (e) {
      throw new Banco.erros.ErroNaConsultaAoBanco(e);
    }
    await client.close();
    if (!(docs instanceof Array)) {
      throw new TypeError("Docs de retorno não é uma Array");
    }

    const feirantes = [];
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      feirantes.push(doc);
    }
    return feirantes;
  }

}

class ErroConstaFeiranteComEmailInformado extends Error {
  code = "ERRO_CONSTA_FEIRANTE_COM_O_EMAIL_INFORMADO";

  constructor() {
    super("Já consta feirante com o email informado");
  }
}

class ErroIdRetornouMaisDeUmFeirante extends Error {
  code = "ERRO_ID_RETORNOU_MAIS_DE_UM_FEIRANTE";

  constructor() {
    super("Id retornou mais de um feirante");
  }
}

FeiranteRepository.erros = {
  ErroConstaFeiranteComEmailInformado,
  ErroIdRetornouMaisDeUmFeirante,
};

module.exports = FeiranteRepository;
