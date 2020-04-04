const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://ifeira:LP979Riar3B6HTKS@cluster0-uybm2.gcp.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

const client = new MongoClient(uri);
const dbName = "ifeira";

class RegioesController {
  async listarEstados(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("localidades");
      const p = collection.aggregate([
        { $group: { _id: { uf: "$uf", nome_estado: "$nome_estado" } } },
      ]);

      console.log(p);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
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
