const Feirante = require('./Feirante');
const Email = require('./Email');
const TelefoneFactory = require('./telefone/TelefoneFactory');

class FeiranteFactory {
    
    static fromObject(dados){
        const feirante = new Feirante;
        
        feirante.nomeDaBarraca = dados.nomeDaBarraca;

        const email = new Email(dados.email);
        feirante.email = email;

        const telefonePrincipal= TelefoneFactory.criar(dados.telefonePrincipal);
        feirante.telefonePrincipal = telefonePrincipal;

        dados.telefonesWhatsapp.forEach(telefone => {
            const telefoneWhatsapp = TelefoneFactory.criar(telefone);
            feirante.addTelefoneWhatsapp(telefoneWhatsapp);
        });

        dados.produtos.forEach(produto => {
            feirante.addProduto(produto);
        });

        dados.tipos.forEach(tipo => {
            feirante.addTipo(tipo);
        });

        dados.bairrosEntrega.forEach(bairro => {
            feirante.addBairroEntrega(bairro);
        });
        
        return feirante;
    }

    static fromJSON(json){
        const object = JSON.parse(json);
        return FeiranteFactory.fromObject(object);
    }

}

module.exports = FeiranteFactory;