class RegioesController {
  async listarEstados(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);

      // Use the collection "people"
      const collection = db.collection("localidades");
      const p = await collection.aggregate([
        { $group: { _id: { uf: "$uf", nome_estado: "$nome_estado" } } },
      ]);
      res(p);
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
