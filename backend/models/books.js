const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma du modèle pour les livres dans l'application en utilisant Mongoose
const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true, unique: true }, // Le titre du livre doit être unique
    author: { type: String, required: true }, // Le nom de l'auteur est obligatoire
    imageUrl: { type: String, required: true }, // L'URL de l'image est obligatoire
    year: { type: Number, required: true }, // L'année de publication est obligatoire
    genre: { type: String, required: true }, // Le genre du livre est obligatoire
    ratings: [
        {
            userId: { type: String, required: true }, // L'identifiant de l'utilisateur est obligatoire pour chaque note
            grade: { type: Number, required: true } // La note (grade) est obligatoire
        }
    ],
    averageRating: { type: Number, required: true } // La note moyenne est obligatoire
});

// Le titre d'un livre dans la base de données doit être unique
// Ce plugin Mongoose est utilisé pour garantir l'unicité et signaler les erreurs
bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);