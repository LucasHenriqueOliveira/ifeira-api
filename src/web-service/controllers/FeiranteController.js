const Banco = require('../infra/Banco');
const FeiranteFactory = require("../models/Feirante/FeiranteFactory");
const FeiranteRepository = require('../models/Feirante/FeiranteRepository');

const bcrypt = require("bcryptjs");

class FeiranteController {

  async gravar(req, res) {
    try{
      const feirante = await FeiranteFactory.fromObject(req.body);
      await FeiranteRepository.gravar(feirante);
      return res.status(201).send();
    }
    catch(e){
      if(e instanceof FeiranteRepository.erros.ErroConstaFeiranteComEmailInformado){
        return res.status(403).json({message: e.message});
      }
      if(e instanceof TypeError){
        return res.status(400).json({message: e.message});
      }
      return res.status(500).send({message: e.message});
    }
  }

  async ler(req, res) {
    const { idFeirante } = req.params;
    try{
      const feirante = await FeiranteRepository.buscarPorId(idFeirante);
      return res.status(200).json(feirante);
    }
    catch(e){
      return res.status(500).send();
    }
  }

  async atualizar(req, res) {
    try{
      const feirante = await FeiranteFactory.fromObject(req.body);
      await FeiranteRepository.atualizar(feirante);
      return res.status(200).send();
    }
    catch(e){
      return res.status(500).send();
    }
  }

  async listarPorBairro(req, res) {
    const {idBairro} = req.params;
    try{
      const feirantes = await FeiranteRepository.buscarPorIdBairro(idBairro);
      return res.status(200).json(feirantes);
    }
    catch(e){
      return res.status(500).send();
    }
  }
  
  
}

module.exports = new FeiranteController();
