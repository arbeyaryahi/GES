
module.exports = app => {
    const produits = require("../controllers/produit.controller");
  
    var router = require("express").Router();
  
router.get('/allproduits',produits.findAll);
router.get('/bynumserie/:num_serie',produits.getbyNumSerie)
router.post("/addproduit",produits.addProduit);
router.put("/updateproduit/:num_serie",produits.updateByNumSerie);
router.delete("/deleteproduit/:num_serie",produits.deleteByNumSerie)
  
router.get('/checkproduit/:num_serie', produits.checkNumSerie);
    app.use('/api', router);
  };
  