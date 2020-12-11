//importer le package express
const express = require('express');
//importer le package body-parser
const bodyParser = require('body-parser');
//importer le package mongoose
const mongoose = require('mongoose');
//
require('dotenv').config();
//accès au chemin de notre système de fichier
const path = require('path');

//importer le routeur sauce et enregistrer dans l'application
const saucesRoutes = require('./routes/sauce');
//importer le routeur utilisateur et enregistrer dans l'application
const userRoutes = require('./routes/user');


//connextion à la base de données MongoDB avec mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//création de l'application express
const app = express();

//headers pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
//transformer le corps de la requête en ojbet js utilisable
app.use(bodyParser.json());
//pour qu'on puisse y accéder depuis les autres fichiers
module.exports = app;


//dire à l'application express de servir ce dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));
//enregistrer le routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/sauces', saucesRoutes);
/*la route attendue par le frontend /api/auth,
tout ce qui est route liée à l'authentification,passera les userRoutes */
app.use('/api/auth', userRoutes);