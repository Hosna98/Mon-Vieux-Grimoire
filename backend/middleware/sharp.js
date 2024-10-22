const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


// Middleware pour optimiser l'image téléchargée et redimensionner si nécessaire
module.exports = async (req, res, next) => {
    try {
        if (!req.file) return next(); // Si aucune image n'est téléchargée, passez au middleware suivant

        const originalImagePath = req.file.path; // Chemin de l'image originale
        const ext = path.extname(originalImagePath).toLowerCase(); 
        const isWebP = ext === '.webp'; // Vérifie si l'image est déjà en WebP
        let optimizedImageName, optimizedImagePath;

        if (isWebP) {
            // Si c'est déjà un fichier WebP, renommez-le
            optimizedImageName = path.basename(originalImagePath);
            optimizedImagePath = originalImagePath; // Pas besoin de le convertir
        } else {
            // Si ce n'est pas WebP, créez un nouveau nom et chemin pour l'image optimisée
            optimizedImageName = `optimized_${path.basename(originalImagePath, ext)}.webp`; 
            optimizedImagePath = path.join('images', optimizedImageName);

            // Utilisez Sharp pour redimensionner et convertir l'image
            await sharp(originalImagePath)
                .resize({ width: 400, height: 300  }) // Redimensionnez à une largeur de 500px
                .webp({ quality: 80 }) // Convertissez en WebP avec une qualité de 80%
                .toFile(optimizedImagePath); // Enregistrez le fichier
        }

        // Supprimez l'image originale
        fs.unlink(originalImagePath, (error) => {
            if (error) {
                console.error("Impossible de supprimer l'image originale :", error);
                return next(error);
            }
        });

        // Mettez à jour le chemin et le nom de fichier dans `req.file`
        req.file.path = optimizedImagePath; 
        req.file.filename = optimizedImageName; 

        next(); // Passez au middleware suivant
    } catch (error) {
        res.status(400).json({ error });
    }
};