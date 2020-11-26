//package necéssaire pour créer une route
const express = require('express');
//créer une route express
const router = express.Router();
//il faut le contrôleur pour associer les fonctions aux différents routes
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;