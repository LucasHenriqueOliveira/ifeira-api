const Telefone = require('../../../src/web-service/feirante/telefone/Telefone');
const TelefoneFactory = require('../../../src/web-service/feirante/telefone/TelefoneFactory');
const TelefoneFixo = require('../../../src/web-service/feirante/telefone/TelefoneFixo');
const TelefoneCelular = require('../../../src/web-service/feirante/telefone/TelefoneCelular');
const ListaTelefonesCelulares = require('../../../src/web-service/feirante/telefone/ListaTelefonesCelulares');

describe('Telefone', () => {

    it('deve instanciar um telefone fixo', async () => {
        const telefone = TelefoneFactory.criar('1138368273');
        expect(telefone instanceof TelefoneFixo).toBe(true);
        expect(telefone instanceof Telefone).toBe(true);
    });

    it('deve instanciar um telefone celular', async () => {
        const telefone = TelefoneFactory.criar('11964234323');
        expect(telefone instanceof TelefoneCelular).toBe(true);
        expect(telefone instanceof Telefone).toBe(true);
    });

    it('não deve instanciar um telefone celular que não comece com 9', async () => {
        let error;
        try{
            const telefone = TelefoneFactory.criar('11564234323');
        }catch(e){
            error = e;
        }
        expect(error instanceof Telefone.erros.NumeroInvalido).toBe(true);
        expect(error.code).toBe('ERROR_NUMERO_INVALIDO');
    });

    it('não deve instanciar um telefone fixo que comece com 9', async () => {
        let error;
        try{
            const telefone = TelefoneFactory.criar('1194234323');
        }catch(e){
            error = e;
        }
        expect(error instanceof Telefone.erros.NumeroInvalido).toBe(true);
        expect(error.code).toBe('ERROR_NUMERO_INVALIDO');
    });

    it('não deve instanciar um telefone celular sem o número de ddd', async () => {
        let error;
        try{
            const telefone = TelefoneFactory.criar('94234323');
        }catch(e){
            error = e;
        }
        expect(error instanceof TelefoneFactory.erros.TelefoneComTamanhoInvalido).toBe(true);
        expect(error.code).toBe('ERRO_TELEFONE_COM_TAMANHO_INVALIDO');
    });

    it('não deve instanciar um telefone fixo sem o número de ddd', async () => {
        let error;
        try{
            const telefone = TelefoneFactory.criar('3234323');
        }catch(e){
            error = e;
        }
        expect(error instanceof TelefoneFactory.erros.TelefoneComTamanhoInvalido).toBe(true);
        expect(error.code).toBe('ERRO_TELEFONE_COM_TAMANHO_INVALIDO');
    });

    it('não deve instanciar um telefone com mais do que 2 digitos de DDD e mais de 9 digitos de telefone', async () => {
        let error;
        try{
            const telefone = TelefoneFactory.criar('119965839482');
        }catch(e){
            error = e;
        }
        expect(error instanceof TelefoneFactory.erros.TelefoneComTamanhoInvalido).toBe(true);
        expect(error.code).toBe('ERRO_TELEFONE_COM_TAMANHO_INVALIDO');
    });

});

describe('ListaTelefone', () => {
    it('deve adicionar um telefone', async () => {
        const telefonesWhatsapp = new ListaTelefonesCelulares;

        const telefone = TelefoneFactory.criar('11964234323');
        telefonesWhatsapp.add(telefone);
        expect(telefonesWhatsapp.telefones[0] === telefone).toBe(true)

        const telefone2 = TelefoneFactory.criar('11959483928');
        telefonesWhatsapp.add(telefone2);
        expect(telefonesWhatsapp.telefones[1] === telefone2).toBe(true)
    });
});