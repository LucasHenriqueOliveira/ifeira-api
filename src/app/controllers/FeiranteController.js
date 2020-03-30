const FeiranteFactory = require('../../feirante/FeiranteFactory');

class SessionController {
    async store(req, res){
        let feirante;
        try{
            feirante = FeiranteFactory.fromObject(req.body);
            
            return res.json(feirante);
        }catch(e){
            console.log(e);
            return res.status(500).json({message: "Erro ao consultar o banco de dados"});
        }
    }
}

module.exports = new SessionController();