const FeiranteFactory = require('../feirante/FeiranteFactory');

class SessionController {

    async gravar(req, res){
        let feirante;
        try{
            feirante = FeiranteFactory.fromObject(req.body);
            
            return res.json(feirante);
        }catch(e){
            console.log(e);
            return res.status(500).json({message: "Erro ao consultar o banco de dados"});
        }
    }

    async ler(req, res){

    }

    async atualizar(req, res){
        
    }

    async listarPorBairro(req, res){

    }

    async dadosPainel(req, res){
        return res.status(200).json({message: "a implementar"});
    }


}

module.exports = new SessionController();