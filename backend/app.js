const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");
const bookRoutes = require('./routes/books');
const path = require('path');
require('dotenv').config();


const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));



// Middleware pour gérer les CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });


  // Middleware used to analyze the body of incoming requests in JSON format
  app.use(express.json());
// Définir les routes d'authentification
  app.use("/api/auth", userRoutes);
  app.use('/api/books', bookRoutes);
  // Middleware pour servir les fichiers statiques (images)
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;