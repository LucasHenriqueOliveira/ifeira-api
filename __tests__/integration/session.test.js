const request = require('supertest');
const IFeiraWS = require('../../src/web-service/IFeiraWS');
const iFeira = new IFeiraWS;

describe('Session', () => {

    it('deve autenticar com credenciais validas', async () => {
        const response = await request(iFeira.express)
            .post("/sessions")
            .send({
                usuario: "teste",
                senha: "teste"
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    it('não deve autenticar com usuário invalido', async () => {
        const response = await request(iFeira.express)
            .post("/sessions")
            .send({
                usuario: "testeInválido",
                senha: "teste"
            });
        expect(response.status).toBe(401);
    });

    it('não deve autenticar com senha invalida', async () => {
        const response = await request(iFeira.express)
            .post("/sessions")
            .send({
                usuario: "teste",
                senha: "testeInválido"
            });
        expect(response.status).toBe(401);
    });

    xit('deve acessar rotas privadas quando autenticado', async() => {
        const resAutenticacao = await request(iFeira.express)
            .post("/sessions")
            .send({
                usuario: "teste",
                senha: "teste"
            });

        const resRotaPrivada = await request(iFeira.express)
            .get("/painel")
            .set('Authorization', `Bearer ${resAutenticacao.token}`);

        expect(resRotaPrivada.status).toBe(200);
    });

    it('não deve acessar rotas privadas sem informar jwt token', async() => {

        const resRotaPrivada = await request(iFeira.express)
            .get("/painel");

        expect(resRotaPrivada.status).toBe(401);
    });

    it('não deve acessar rotas privadas informando um jwt token inválido', async() => {

        const resRotaPrivada = await request(iFeira.express)
            .get("/painel")
            .set('Authorization', `Bearer 123456`);

        expect(resRotaPrivada.status).toBe(401);
    });

});