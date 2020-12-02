//pour créer le routeur,il faut le package express
const express = require('express');
//création d'un routeur express
const router = express.Router();
//importer la logique métier de nos routes
const sauceCtrl = require('../controllers/sauce');
//importer middleware auth
const auth = require('../middleware/auth');


// Routes
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);


module.exports = router;





