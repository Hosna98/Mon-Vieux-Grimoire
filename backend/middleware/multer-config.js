const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Middleware pour gérer l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // Le dossier où seront stockées les images
  },
  filename: (req, file, callback) => {
    // Validation du type de fichier
    const extension = MIME_TYPES[file.mimetype];
    if (!extension) {
      return callback(new Error('Seuls les fichiers de type image (JPG, JPEG, PNG) sont acceptés.'));
    }

    // Génération d'un nom de fichier unique
    const name = file.originalname.split(' ').join('_').replace(/\.[^/.]+$/, "");  // Nettoyer le nom
    callback(null, `${name}_${Date.now()}.${extension}`);
  }
});

// Configuration de multer avec les options de stockage et gestion d'un seul fichier 'image'
module.exports = multer({ storage }).single('image');