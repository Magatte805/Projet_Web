const express = require('express');
const routerRestaurant = express.Router();
const axios = require('axios'); 
const path = require('path');


// Route pour la page d'accueil
routerRestaurant.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Acceuil.html'));
});



// Route pour récupérer les restaurants dans une ville donnée
routerRestaurant.get('/restaurants', async (req, res) => {
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


module.exports = routerRestaurant;