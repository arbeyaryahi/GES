module.exports = app => {
  const operations = require("../controllers/operation.controller");

  var router = require("express").Router();

router.get('/alloperations',operations.findAll);
router.get('/bydescription/:description_operation',operations.getByDescription)
router.post("/addoperation",operations.addOperation);
router.put("/updateoperation/:description_operation",operations.updateByDescription);
router.delete("/deleteoperation/:description_operation",operations.deleteByOperation)
router.get('/checkoperation/:description_operation', operations.checkDescription);

  app.use('/api', router);
};


