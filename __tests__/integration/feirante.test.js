const request = require('supertest');

const IFeiraWS = require('../../src/IFeiraWS');
const iFeira = new IFeiraWS;

describe('Rota feirante', () => {

    it('deve gravar um feirante na rota post', async () => {
        
        const feirante = {
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
          };

        const response = await request(iFeira.express)
            .post('/feirante')
            .send(feirante);

        expect(response.status).toBe(200);
        expect(JSON.stringify(JSON.parse(response.body))).toBe(JSON.stringify(feirante));         
    });

});