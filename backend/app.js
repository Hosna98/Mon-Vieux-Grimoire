const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");


const app = express();

// Connexion à MongoDB
  mongoose.connect('mongodb+srv://qacharhosna:Hosna98@cluster0.lc2zu.mongodb.net/')
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



module.exports = app;