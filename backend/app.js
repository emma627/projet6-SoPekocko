//importer le package express
const express = require('express');
//importer le package body-parser
const bodyParser = require('body-parser');
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