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

      // Use the collection "people"
      const collection = db.collection("localidades");
      const p = collection.find({}).toArray(function (err, result) {
        if (err) {
          console.log(err);
        }
        if (JSON.stringify(result).length > 0) {
          console.log(JSON.stringify(result));
          res.json(result);
        }
      });
    } catch (err) {
      console.log(err.stack);
    }
  }

  async listarMunicipiosPorEstado(req, res) {
    await db.getCollection("localidades").aggregate([
      { $match: { nome_estado: "minas gerais" } },
      {
        $group: {
          _id: {
            uf: "$uf",
            nome_estado: "$nome_estado",
            nome_municipio: "$nome_municipio",
          },
        },
      },
    ]);
  }

  async listarBairrosPorMunicipio(req, res) {
    await db.getCollection("localidades").aggregate([
      { $match: { nome_estado: "minas gerais", nome_municipio: "contagem" } },
      {
        $group: {
          _id: {
            uf: "$uf",
            nome_estado: "$nome_estado",
            nome_municipio: "$nome_municipio",
            bairros: "$bairros",
          },
        },
      },
    ]);
  }
}

module.exports = new RegioesController();
