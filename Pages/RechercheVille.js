window.onload = () => {
    const cityInput = document.getElementById('citySearch');
    const cityResults = document.getElementById('cityResults');

 // Fonction pour rechercher les restaurants dans une ville donnée à l'aide de l'API Overpass
async function searchRestaurants(cityName) {
    try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];area[name="${cityName}"]->.searchArea;(node["amenity"="restaurant"](area.searchArea););out;`);
        const data = await response.json();
        const restaurants = data.elements.map(element => ({
            name: element.tags.name,
            cuisine: element.tags.cuisine ,
            address: element.tags['addr:street'] ,
            postcode: element.tags['addr:postcode'] ,
            openingHours: element.tags.opening_hours 
        }));

        return restaurants;
    } catch (error) {
        console.error('Error searching restaurants:', error);
        throw error;
    }
}

// Fonction pour afficher les restaurants 
function displayRestaurants(restaurants) {
    const restaurantsList = document.getElementById('restaurantsList');
    restaurantsList.innerHTML = '';

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name && restaurant.openingHours && restaurant.cuisine && restaurant.address
    );

    filteredRestaurants.forEach(restaurant => {
        const li = document.createElement('li');

        // Afficher le nom du restaurant
        const name = document.createElement('p');
        name.textContent = `Name: ${restaurant.name}`;
        li.appendChild(name);

        // Afficher le type de cuisine
        const cuisine = document.createElement('p');
        cuisine.textContent = `Cuisine: ${restaurant.cuisine}`;
        li.appendChild(cuisine);

        // Afficher l'adresse du restaurant
        const address = document.createElement('p');
        address.textContent = `Address: ${restaurant.address}`;
        li.appendChild(address);

        // Afficher les heures d'ouverture du restaurant
        const openingHours = document.createElement('p');
        openingHours.textContent = `Opening Hours: ${restaurant.openingHours}`;
        li.appendChild(openingHours);

        restaurantsList.appendChild(li);
    });
}



    cityInput.addEventListener('input', async () => {
        const query = cityInput.value.trim();
        if (query.length === 0) {
            cityResults.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`/search?query=${query}`);
            const cities = await response.json();

            cityResults.innerHTML = '';
            if (Array.isArray(cities)) {
                cities.forEach(city => {
                    const span = document.createElement('span');
                    span.textContent = city;
                    span.style.cursor = 'pointer';
                    span.addEventListener('click', async () => {
                        try {
                            const restaurants = await searchRestaurants(city);
                            displayRestaurants(restaurants);
                        } catch (error) {
                            console.error('Error searching restaurants:', error);
                        }
                    });
                    cityResults.appendChild(span);
                    const br = document.createElement('br');
                    cityResults.appendChild(br);
                });
            }
            


        } catch (error) {
            console.error('Error searching cities:', error);
        }
    });
};
