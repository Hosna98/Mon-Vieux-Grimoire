const express = require('express');
const mongoose = require('mongoose');



const userRoutes = require("./routes/user");


const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb+srv://qacharhosna:Hosna98@cluster0.lc2zu.mongodb.net/')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));


app.use((req,res) => {
    res.json({message:"Votre requete a bien été réçu "});
});


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

  app.use("/api/auth", userRoutes);


module.exports = app;