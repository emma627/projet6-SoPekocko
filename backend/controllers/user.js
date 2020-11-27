//il faut le package de chiffrement bcrypt pour la fonction signup
const bcrypt = require('bcrypt');
//package qui nous perment de créer des token et de les vérifier
const jwt = require('jsonwebtoken');
//importer schéma utilisateur
const User = require('../models/User');

//enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
//fonction login pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
    // Recherche d'un utilisateur dans la base de données
    User.findOne({ email: req.body.email})
    .then(user => {
        // Si on ne trouve pas l'utilisateur
        if(!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'})
        }
        //comparer le mot de passe envoyé par la requête avec celui de la base de données
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'})
            }
            res.status(200).json({
                userId: user._id,
                // créer un token pour sécuriser le compte de l'utilisateur
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};