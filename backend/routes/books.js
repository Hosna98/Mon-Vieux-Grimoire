const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config"); // Middleware pour la gestion des fichiers
const optimizeImage = require("../middleware/sharp"); // Middleware pour l'optimisation des images
const booksCtrl = require("../controllers/books");

// Routes
router.get('/', booksCtrl.getAllBooks);
router.get('/bestrating', booksCtrl.getBestRatedBooks);
router.get('/:id', booksCtrl.getOneBook);

// Remplacer 'upload' et 'processImage' par 'multer'
router.post('/', auth, multer, optimizeImage, booksCtrl.createBook);
router.put('/:id', auth, multer, optimizeImage, booksCtrl.updateBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.post('/:id/rating', auth, booksCtrl.rateBook);

module.exports = router;