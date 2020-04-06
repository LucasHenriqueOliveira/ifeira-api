const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://ifeira:LP979Riar3B6HTKS@cluster0-uybm2.gcp.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const dbName = "ifeira";

class SessionController {
  async store(req, res) {
    const { usuario, senha } = req.body;

    let loginValido;
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

    const hashDaSenhaTeste = await bcrypt.hash("teste", 8);
    const senhaConfere = await bcrypt.compare(senha, hashDaSenhaTeste);
    const usuarioConfere = usuario === "teste";

    if (usuarioConfere && senhaConfere) {
      loginValido = true;
    } else {
      loginValido = false;
    }

    if (!loginValido) {
      return res.status(401).json({ message: "Login inválido" });
    }

    const dadosDoToken = { id: usuario };
    const token = jwt.sign(dadosDoToken, process.env.APP_SECRET);

    return res.status(200).json({
      token: token,
    });
  }
}

module.exports = new SessionController();
