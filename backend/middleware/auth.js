require("dotenv").config();
// Importation du module jsonwebtoken pour la gestion des tokens JWT
const jwt = require("jsonwebtoken");


// Middleware that checks and validates the JWT
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        console.error("Erreur d'authentification:", error);
        res.status(403).json({ error });
    }
};