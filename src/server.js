const IFeiraWS = require('./IFeiraWS');

const porta = process.env.PORT || 3000;

debugger;

const iFeiraWS = new IFeiraWS();
iFeiraWS.ouvir(porta);

console.log(`Ouvindo na porta ${porta}`);