const Email = require('../../feirante/Email');

describe('Email', () => {

    it('deve instanciar email', async () => {
        const email = new Email('paulo.ch8@gmail.com');
        expect(email instanceof Email).toBe(true);
    });

    it('propriedade local deve ter a primeira parte do email', async () => {
        const email = new Email('paulo.ch8@gmail.com');
        expect(email.local).toBe('paulo.ch8');
    });

    it('propriedade domain deve ter a segunda parte do email', async () => {
        const email = new Email('paulo.ch8@gmail.com');
        expect(email.domain).toBe('gmail.com');
    });

    it('propriedade completo deve retornar o email completo', async () => {
        const email = new Email('paulo.ch8@gmail.com');
        expect(email.completo).toBe('paulo.ch8@gmail.com');
    });

});