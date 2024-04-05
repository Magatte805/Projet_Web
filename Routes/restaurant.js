const express = require('express');
const routerRestaurant = express.Router();
const axios = require('axios'); 
const path = require('path');


// Route pour la page d'accueil
routerRestaurant.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Acceuil.html'));
});



// Route pour récupérer les restaurants dans une ville donnée en utilisant les coordonnées géographiques 
routerRestaurant.get('/restaurants', async (req, res) => {
    try {
        const { cityName } = req.query;

        // Recherche des coordonnées géographiques de la ville à l'aide de l'API Nominatim
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`);
        const geoData = await geoResponse.json();
        
        // Vérifier si la ville est trouvée
        if (geoData.length === 0) {
            throw new Error('City not found');
        }

        // Extraire les coordonnées géographiques 
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        // Vérifier si les coordonnées géographiques sont valides
        if (isNaN(lat) || isNaN(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
            return res.status(400).json({ error: 'Invalid coordinates' });
        }

        // Requête vers l'API Overpass pour rechercher les restaurants à proximité
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${lat},${lon})[amenity=restaurant];out;`);
        const data = await response.json();
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


module.exports = routerRestaurant;