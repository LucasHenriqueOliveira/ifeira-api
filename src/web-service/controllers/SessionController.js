const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class SessionController {
    async store(req, res){
        const { usuario, senha } = req.body;

        let loginValido;
        try{
            // consultar no banco e para buscar os dados do usuário e hash da senha;
        }catch(e){
            console.log(e);
            return res.status(500).json({message: "Erro ao consultar o banco de dados"});
        }

        const hashDaSenhaTeste = await bcrypt.hash("teste", 8); 
        const senhaConfere = await bcrypt.compare(senha, hashDaSenhaTeste);
        const usuarioConfere = usuario === "teste";
        
        if(usuarioConfere && senhaConfere){
            loginValido = true;
        }else{
            loginValido = false;
        }

        if(!loginValido){
            return res.status(401).json({message: 'Login inválido'});
        }

        const dadosDoToken = { id: usuario };
        const token = jwt.sign(dadosDoToken, process.env.APP_SECRET);

        return res.status(200).json({
            token: token 
        });
    }
}

module.exports = new SessionController();