const IFeiraWS = require('./web-service/IFeiraWS');

const porta = process.env.PORT || 3000;

debugger;

const iFeiraWS = new IFeiraWS();
iFeiraWS.ouvir(porta);

console.log(`Ouvindo na porta ${porta}`);