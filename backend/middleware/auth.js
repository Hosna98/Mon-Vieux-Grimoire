require("dotenv").config();

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
        res.status(403).json({ error });
    }
};