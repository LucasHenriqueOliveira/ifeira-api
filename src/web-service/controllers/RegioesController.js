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
    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("localidades");
      const p = collection
        .aggregate([
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
    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("localidades");
      const p = collection
        .aggregate([
          {
            $match: { nome_estado: "minas gerais", nome_municipio: "contagem" },
          },
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

  async feiranteMaisProximo(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("localidades");
      const p = collection
        .aggregate([
          {
            $geoNear: {
              near: {
                coordinates: [-23.5640265, -46.6527128],
                type: "Point",
              },
              distanceField: "distancia.calculada",
              spherical: true,
            },
          },
          { $skip: 1 },
          { $limit: 2 },
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
