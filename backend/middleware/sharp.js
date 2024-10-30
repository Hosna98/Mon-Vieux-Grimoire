const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


// Middleware pour optimiser l'image téléchargée et redimensionner si nécessaire
module.exports = async (req, res, next) => {
    try {
        if (!req.file) return next(); // Si aucune image n'est téléchargée, passez au middleware suivant

        const originalImagePath = req.file.path; // Chemin de l'image originale
        const ext = path.extname(originalImagePath).toLowerCase(); 
        // Si l'image est déjà en WebP, on ne fait pas d'optimisation
        if (ext === '.webp') {
            return next();
        }
        

        // Même si l'image est déjà en WebP, nous devons vérifier la taille et la redimensionner si nécessaire
        optimizedImageName = `optimized_${path.basename(originalImagePath, ext)}.webp`; 
        optimizedImagePath = path.join('images', optimizedImageName);

        // Utilisez Sharp pour redimensionner l'image (même si elle est déjà en WebP)
        await sharp(originalImagePath)
            .resize({  fit: sharp.fit.fill }) // Redimensionnez à une taille spécifiée
            .webp({ quality: 80 }) // Convertissez en WebP ou gardez WebP avec la qualité spécifiée
            .toFile(optimizedImagePath); // Enregistrez l'image optimisée

        // Supprimez l'image originale après la conversion
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