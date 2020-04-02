const request = require('supertest');

const IFeiraWS = require('../../src/web-service/IFeiraWS');
const iFeira = new IFeiraWS;

describe('Rota feirante', () => {

    it('deve gravar um feirante na rota post', async () => {

        const resAutenticacao = await request(iFeira.express)
            .post("/sessions")
            .send({
                usuario: "teste",
                senha: "teste"
            });

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
            .send(feirante)
            .set('Authorization', `Bearer ${resAutenticacao.body.token}`);

        expect(response.status).toBe(200);
        
    });

});