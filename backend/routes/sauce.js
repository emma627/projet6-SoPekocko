//pour créer le routeur,il faut le package express
const express = require('express');
//création d'un routeur express
const router = express.Router();
//importer la logique métier de nos routes
const sauceCtrl = require('../controllers/sauce');



// Routes
router.get('/',sauceCtrl.getAllSauces);
router.get('/:id',sauceCtrl.getOneSauce);
router.post('/',sauceCtrl.createSauce);
router.put('/:id',sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);


module.exports = router;





