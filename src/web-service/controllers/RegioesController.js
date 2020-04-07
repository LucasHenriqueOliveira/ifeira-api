const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://ifeira:LP979Riar3B6HTKS@cluster0-uybm2.gcp.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const dbName = "ifeira";

class RegioesController {

  async listarEstados(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);

      const collection = db.collection("municipios");
      const p = collection
        .aggregate([
          { $group: { _id: { uf: "$uf", nome_estado: "$nome_estado" } } },
        ])
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

  async listarMunicipiosPorEstado(req, res) {
    
    const {uf} = req.params;
    console.log(uf);

    try {
      await client.connect();
      const db = client.db(dbName);

      const collection = db.collection("municipios");
      const p = collection
        .aggregate([
          { $match: { uf } },
          {
            $group: {
              _id: {
                uf: "$uf",
                nome_estado: "$nome_estado",
                nome_municipio: "$nome_municipio",
              },
            },
          },
        ])
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

  async listarBairrosPorMunicipio(req, res) {

    const {idMunicipio} = req.params;

    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("bairros");
      const p = collection
        .aggregate([
          { $match: { municipio: idMunicipio } },
          {
            $lookup: {
              from: "municipios",
              localField: "municipio",
              foreignField: "_id",
              as: "dados_municipais",
            },
          },
          {
            $project: {
              _id: 1,
              nome: 1,
              "dados_municipais.uf": 1,
              "dados_municipais.nome_estado": 1,
              "dados_municipais.nome_municipio": 1,
            },
          },
        ])
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

}

module.exports = new RegioesController();
