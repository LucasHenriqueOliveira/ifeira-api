const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const FeiranteController = require('./app/controllers/FeiranteController');

routes.post('/feirante', FeiranteController.store);

// middleware aplicado para as rotas abaixo
routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;