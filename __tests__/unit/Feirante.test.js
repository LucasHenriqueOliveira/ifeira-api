const FeiranteFactory = require('../../feirante/FeiranteFactory');
const Feirante = require('../../feirante/Feirante');

describe('Feirante', () => {

    it('deve instanciar um Feirante de um objeto', async () => {

        const dados = {
            nomeDaBarraca: "Barraca Brás",
            email: "barraca.bras@ig.com.br",
            telefonePrincipal: "1138629584",
            telefonesWhatsapp: [
                "11963234854",
                "11943546555",
                "11949543323"
            ],
            produtos: [
                "legumes",
                "frutas nacionais",
                "frutas importadas"
            ],
            tipos: [
                "orgânicos",
                "não orgânicos"
            ],
            bairrosEntrega: [
                "Jardins",
                "Vila Mariana",
                "Moema"
            ]
        };
        const feirante = FeiranteFactory.fromObject(dados);

        expect(feirante instanceof Feirante).toBe(true);
        expect(feirante.nomeDaBarraca).toBe(dados.nomeDaBarraca);
        expect(feirante.email.toString()).toBe(dados.email);
        expect(feirante.telefonePrincipal.toString()).toBe(dados.telefonePrincipal);
        expect(feirante.telefonesWhatsapp.toString()).toBe(dados.telefonesWhatsapp.toString());
        expect(feirante.produtos.toString()).toBe(dados.produtos.toString());
        expect(feirante.tipos.toString()).toBe(dados.tipos.toString());
        expect(feirante.bairrosEntrega.toString()).toBe(dados.bairrosEntrega.toString());


        expect(JSON.stringify(feirante)).toBe(JSON.stringify(dados));
    });

    it('deve instanciar um Feirante de um json', async () => {
        
        const json = `{
            "nomeDaBarraca": "Barraca Brás",
            "email": "barraca.bras@ig.com.br",
            "telefonePrincipal": "1138629584",
            "telefonesWhatsapp": [
              "11963234854",
              "11943546555",
              "11949543323"
            ],
            "produtos": [
              "legumes",
              "frutas nacionais",
              "frutas importadas"
            ],
            "tipos": [
              "orgânicos",
              "não orgânicos"
            ],
            "bairrosEntrega": [
              "Jardins",
              "Vila Mariana",
              "Moema"
            ]
          }`;
        const feirante = FeiranteFactory.fromJSON(json);
        expect(feirante instanceof Feirante).toBe(true);

    });

});