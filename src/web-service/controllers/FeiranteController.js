const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://ifeira:LP979Riar3B6HTKS@cluster0-uybm2.gcp.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const dbName = "ifeira";

const FeiranteFactory = require("../feirante/FeiranteFactory");

class SessionController {
  async gravar(req, res) {
    let feirante;
    try {
      feirante = FeiranteFactory.fromObject(req.body);

      return res.json(feirante);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: "Erro ao consultar o banco de dados" });
    }
  }

  //paulo henrique achou
  async ler(req, res) {
    try {
      try {
        await client.connect();
        const db = client.db(dbName);

        const collection = db.collection("feirante");
        const p = collection;
        db.getCollection("feirantes")
          .find({ email: "edson_yamada@gmail.com" })
          .toArray(function (err, result) {
            if (err) {
              console.log(err);
            }
            res.json(result);
          });
      } catch (err) {
        console.log(err.stack);
      }
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: "Erro ao consultar o banco de dados" });
    }
  }

  async atualizar(req, res) {
    try {
      try {
        await client.connect();
        const db = client.db(dbName);

        const collection = db.collection("feirante");
        const p = collection;

        // set vc coloca todos os campos q quer atualizar

        db.getCollection("feirantes")
          .update({ email: "edson_yamada@gmail.com" }, { $set: { nome: "zl" } })
          .toArray(function (err, result) {
            if (err) {
              console.log(err);
            }
            res.json(result);
          });
      } catch (err) {
        console.log(err.stack);
      }
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: "Erro ao consultar o banco de dados" });
    }
  }

  async listarPorBairro(req, res) {

    const {idBairro} = req.params;
    console.log({idBairro});

    try {
      await client.connect();
      const db = client.db(dbName);

      const collection = db.collection("feirantes");
      const p = collection
        .find({ bairros: idBairro })
        .toArray(function (err, result) {
          if (err) {
            console.log(err);
          }
          res.json(result);
        });
    } catch (err) {
      console.log(err.stack);
    }
  }

  async dadosPainel(req, res) {
    return res.status(200).json({ message: "a implementar" });
  }

  /* Documentacao do código: Israel 06/04/2020 
  Cmo nao tem controlador pra isso deixei aqui e depois o backender decide o que fazer */
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

module.exports = new SessionController();
