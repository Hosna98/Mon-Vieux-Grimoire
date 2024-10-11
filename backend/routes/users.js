
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup); // Route pour l'inscription
router.post('/login', userCtrl.login); // Route pour la connexion

module.exports = router;