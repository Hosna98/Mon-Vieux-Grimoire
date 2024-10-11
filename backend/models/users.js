// On importe le module mongoose pour interagir avec la base de données MongoDB
const mongoose = require("mongoose");
// On importe le plugin mongoose-unique-validator pour vérifier l'unicité des champs
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
// On applique le plugin uniqueValidator au schéma utilisateur
  userSchema.plugin(uniqueValidator);
  module.exports = mongoose.model("User", userSchema);