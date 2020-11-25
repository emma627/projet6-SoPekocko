//mongoose facilite les tâches d'écriture et de lecture avec mongoDB
const mongoose = require('mongoose');
//package qui facilite la tâche d'empêcher de s'enregistrer plusieurs fois avec la même adresse mail
const uniqueValidator = require('mongoose-unique-validator');

// modèle utilisateur dans la base de données
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

// s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse mail
userSchema.plugin(uniqueValidator);

//exporter ce Schema sous forme de modèle
module.exports = mongoose.model('User', userSchema);