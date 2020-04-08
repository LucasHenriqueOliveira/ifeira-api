const Feirante = require('./Feirante');
const Banco = require('../../infra/Banco');
const ObjectID = require('mongodb').ObjectID;
const FeiranteFactory = require("./FeiranteFactory");

class FeiranteRepository {

    static async gravar(feirante){
        if(!(feirante instanceof Feirante)){
            throw new TypeError("Feirante não é uma instância correta");
        }
        const docs = await Banco.encontrarDocumentos("feirantes", { email: String(feirante.email) });
        if(docs.length){
            throw new FeiranteRepository.erros.ErroConstaFeiranteComEmailInformado;
        }
        await Banco.gravarDocumento("feirantes", feirante.document );
    }

    static async atualizar(feirante){
        if(!(feirante instanceof Feirante)){
            throw new TypeError("Feirante não é uma instância correta");
        }
        await Banco.atualizarDocumento("feirantes", {email: String(feirante.email)}, feirante.document);
    }

    static async buscarPorId(id){
        id = String(id).trim();
        if(!id){
            throw new TypeError("Id não informado");
        }
        const objId = new ObjectID(id);
        const docs = await Banco.encontrarDocumentos("feirantes", { _id: objId });
        if (docs.length > 1) {
            throw new FeiranteRepository.erros.ErroIdRetornouMaisDeUmFeirante;
        }
        const doc = docs[0];
        delete doc.senha;
        const feirante = await FeiranteFactory.fromObject(doc);
        return feirante;
    }

    static async buscarPorIdBairro(idBairro){
        idBairro = String(idBairro).trim();
        if(!idBairro){
            throw new TypeError("idBairro não informado");
        }
        const docs = await Banco.encontrarDocumentos("feirantes", { bairrosDeEntrega: idBairro });
        const feirantes = [];
        for(let i=0; i<docs.length; i++){
            const doc = docs[i];
            
            delete doc.senha; // PREOCUPAÇÃO: ter que deletar a senha todo lugar que consultar... se esquecer pode acabar retornando a senha para o front
            // não seria melhor criar um model que não tivesse a senha?

            const feirante = await FeiranteFactory.fromObject(doc);
            feirantes.push(feirante);
        }
        return feirantes;
    }

}



class ErroConstaFeiranteComEmailInformado extends Error{
    code = "ERRO_CONSTA_FEIRANTE_COM_O_EMAIL_INFORMADO";

    constructor(){
        super("Já consta feirante com o email informado");
    }
}

class ErroIdRetornouMaisDeUmFeirante extends Error{
    code = "ERRO_ID_RETORNOU_MAIS_DE_UM_FEIRANTE";

    constructor(){
        super("Id retornou mais de um feirante");
    }
}

FeiranteRepository.erros = {ErroConstaFeiranteComEmailInformado, ErroIdRetornouMaisDeUmFeirante};

module.exports = FeiranteRepository;