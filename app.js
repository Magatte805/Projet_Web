// Importer les modules nécessaires
const express = require('express');
const path = require('path');
const villeRoute = require('./Routes/ville.js');
const restaurantRoute = require('./Routes/restaurant.js');
const app = express();


// Définir les routes
app.use('/', villeRoute);
app.use('/', restaurantRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/test', express.static(path.join(__dirname, 'test')));



// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 
