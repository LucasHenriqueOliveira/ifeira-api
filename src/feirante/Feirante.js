const ListaTelefonesCelulares = require('./telefone/ListaTelefonesCelulares');
const Email = require('./Email');
const Telefone = require('./telefone/Telefone');

class Feirante {

    #nomeDaBarraca;
    #email;
    #telefonePrincipal;
    #telefonesWhatsapp = new ListaTelefonesCelulares;
    #produtos = [];
    #tipos = [];
    #bairrosEntrega = [];
    #temLocalDeAtendimento;
    #enderecoLocalDeAtendimento;

    set nomeDaBarraca(nome){
        
        if(!nome || typeof nome !== "string"){
            throw new TypeError("Nome não é uma string");
        }

        nome = nome.trim();

        if(!nome || !nome.length > 5){
            throw new TypeError('O nome precisa ter no mínimo 5 letras');
        }

        this.#nomeDaBarraca = nome;

    }

    get nomeDaBarraca(){
        return this.#nomeDaBarraca;
    }

    set email(email){
        if(!(email instanceof Email)){
            throw new TypeError('Email não é uma instância correta');
        }
        this.#email = email;
    }

    get email(){
        return this.#email;
    }

    set telefonePrincipal(telefone){
        if(!(telefone instanceof Telefone)){
            throw new TypeError('Telefone não é uma instância correta');
        }
        this.#telefonePrincipal = telefone;
    }

    get telefonePrincipal(){
        return this.#telefonePrincipal;
    }

    addTelefoneWhatsapp(telefone){
        if(!(telefone instanceof Telefone)){
            throw new TypeError('Telefone não é uma instância correta');
        }
        this.#telefonesWhatsapp.add(telefone);
    }

    get telefonesWhatsapp(){
        return this.#telefonesWhatsapp.telefones;
    }

    addProduto(produto){
        if(!produto || typeof produto !== "string"){
            throw new TypeError("Produto não é uma string");
        }

        produto = produto.trim();

        if(!produto || !produto.length > 5){
            throw new TypeError('O produto precisa ter no mínimo 5 letras');
        }

        this.#produtos.push(produto);
    }

    get produtos(){
        return [...this.#produtos];
    }

    addTipo(tipo){
        if(!tipo || typeof tipo !== "string"){
            throw new TypeError("Tipo não é uma string");
        }

        tipo = tipo.trim();

        if(!tipo || !tipo.length > 5){
            throw new TypeError('O tipo precisa ter no mínimo 5 letras');
        }

        this.#tipos.push(tipo);
    }

    get tipos(){
        return [...this.#tipos];
    }

    addBairroEntrega(bairro){
        if(!bairro || typeof bairro !== "string"){
            throw new TypeError("Bairro não é uma string");
        }

        bairro = bairro.trim();

        if(!bairro || !bairro.length > 5){
            throw new TypeError('O bairro precisa ter no mínimo 5 letras');
        }

        this.#bairrosEntrega.push(bairro);
    }

    get bairrosEntrega(){
        return [...this.#bairrosEntrega];
    }

    toJSON(){
        return {
            nomeDaBarraca: this.nomeDaBarraca,
            email: this.email,
            telefonePrincipal: this.telefonePrincipal,
            telefonesWhatsapp: this.telefonesWhatsapp,
            produtos: this.produtos,
            tipos: this.tipos,
            bairrosEntrega: this.bairrosEntrega
        };
    }

}

module.exports = Feirante;