const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const path = require('path');

// Route pour la page d'accueil
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Pages/Acceuil.html'));
});

// Route pour la recherche de villes avec autocomplétion
router.get('/search', async (req, res) => {
    try {
        // Récupérer le texte de recherche saisi par l'utilisateur depuis le paramètre de requête "query"
        const { query } = req.query;
        
        // Effectuer une requête à l'API de la Base Adresse Nationale (BAN) pour rechercher les villes
        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality`);

        // Récupérer les résultats de la recherche depuis la réponse de l'API
        const cities = response.data.features.map(feature => feature.properties.city);

        // Filtrer les villes en fonction de la chaîne de recherche 
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(query.toLowerCase()));

        // Renvoyer les villes filtrées au format JSON à l'interface utilisateur
        res.json(filteredCities);
    } catch (error) {
        console.error('Error searching cities:', error);
        // Renvoyer une erreur HTTP 500 en cas d'erreur lors de la recherche de villes
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
