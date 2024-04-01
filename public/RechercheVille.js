window.onload = () => {
    const cityInput = document.getElementById('citySearch');
    const cityResults = document.getElementById('cityResults');
    let selectedCityElement = null;

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

    const limitedRestaurants = filteredRestaurants.slice(0, 20);

    limitedRestaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.classList.add('Divrestaurant');

        // Afficher le nom du restaurant
        const name = document.createElement('p');
        name.innerHTML= `<b>Nom du restaurant:</b> <i>${restaurant.name}</i>`;
        div.appendChild(name);

        // Afficher le type de cuisine
        const cuisine = document.createElement('p');
        cuisine.innerHTML = `<b>Type de Cuisine:</b> <i>${restaurant.cuisine} </i>`;
        div.appendChild(cuisine);

        // Afficher l'adresse du restaurant
        const address = document.createElement('p');
        address.innerHTML = `<b>Addresse:</b> <i> ${restaurant.address} </i>`;
        div.appendChild(address);

        // Afficher les heures d'ouverture du restaurant
        const openingHours = document.createElement('p');
        openingHours.innerHTML = `<b>Heure d'ouverture:</b> <i>${restaurant.openingHours}</i>`;
        div.appendChild(openingHours);

        restaurantsList.appendChild(div);
    });
}


// Recherche ville 
    cityInput.addEventListener('input', async () => {
        const query = cityInput.value.trim();
        if (query.length === 0) {
            cityResults.innerHTML = '';
            restaurantsList.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`/search?query=${query}`);
            const cities = await response.json();

            cityResults.innerHTML = '';
            if (Array.isArray(cities)) {
                cities.forEach(city => {
                    const li = document.createElement('li');
                    li.textContent = city;
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', async () => {
                        try {
                            if (selectedCityElement) {
                                selectedCityElement.classList.remove('selected-city'); 
                            }
                            li.classList.add('selected-city'); 
                            selectedCityElement = li; 
                            const restaurants = await searchRestaurants(city);
                            displayRestaurants(restaurants);
                            
                        } catch (error) {
                            console.error('Error searching restaurants:', error);
                        }
                    });
                    cityResults.appendChild(li);
                    const br = document.createElement('br');
                    cityResults.appendChild(br);
                });
            }
            


        } catch (error) {
            console.error('Error searching cities:', error);
        }
    });
};
