const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const path = require('path');

// Route pour la page d'accueil
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Acceuil.html'));
});


// Route pour la recherche de villes 
router.get('/search', async (req, res) => {
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

// Route pour récupérer les restaurants dans une ville donnée
router.get('/restaurants', async (req, res) => {
    try {
        const { cityName } = req.query;
        const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];area[name="${cityName}"]->.searchArea;(node["amenity"="restaurant"](area.searchArea););out;`);
        const data = response.data;
        const restaurants = data.elements.map(element => ({
            name: element.tags.name,
            cuisine: element.tags.cuisine,
            address: element.tags['addr:street'],
            postcode: element.tags['addr:postcode'],
            openingHours: element.tags.opening_hours
        }));

        const filteredRestaurants = restaurants.filter(restaurant =>
            restaurant.name && restaurant.openingHours && restaurant.cuisine && restaurant.address
        );
    
        res.json(filteredRestaurants);
    } catch (error) {
        console.error('Error retrieving restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});  


module.exports = router;
