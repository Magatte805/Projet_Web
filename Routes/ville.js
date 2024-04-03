const express = require('express');
const routerVille = express.Router();
const axios = require('axios'); 
const path = require('path');

// Route pour la page d'accueil
routerVille.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Acceuil.html'));
});


// Route pour la recherche de villes 
routerVille.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality`);
        
        if (!response.data || !response.data.features || !Array.isArray(response.data.features)) {
            throw new Error('Invalid response from BAN API');
        }

        const cities = response.data.features.map(feature => feature.properties.city);

        // Filtrer les villes en fonction de la chaîne de recherche 
        let filteredCities = [];
        if (Array.isArray(cities)) {
            filteredCities = cities.filter(city => city.toLowerCase().startsWith(query.toLowerCase()));
        }

        // Renvoyer les villes filtrées au format JSON à l'interface utilisateur
        res.json(filteredCities);
    } catch (error) {
        console.error('Error searching cities:', error);
        if (error.message !== 'Invalid response from BAN API') {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json([]); 
        }
    }
});  

module.exports = routerVille;