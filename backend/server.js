const http = require('http');
const app = require ('./app');


app.set('port',process.env.PORT|| 3000);
// Créer un serveur HTTP
const server = http.createServer(app);

// Configurer le serveur pour écouter sur le port spécifié
const port = process.env.PORT || 3000; // Utiliser le port d'environnement ou 3000 par défaut
server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});