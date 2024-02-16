window.onload = () => {
    const cityInput = document.getElementById('citySearch');
    const cityResults = document.getElementById('cityResults');

    cityInput.addEventListener('input', async () => {
        const query = cityInput.value.trim();
        if (query.length === 0) {
            cityResults.innerHTML = '';
            return;
        }

        try {
            // Effectuer une requête GET à l'URL '/search' avec le texte de recherche
            const response = await fetch(`/search?query=${query}`);
            const cities = await response.json();

            // Afficher les résultats de la recherche dans la liste cityResults
            cityResults.innerHTML = '';
            cities.forEach(city => {
                const span = document.createElement('span');
                span.textContent = city;
                cityResults.appendChild(span);
                const br = document.createElement('br');
                cityResults.appendChild(br);
            });
        } catch (error) {
            console.error('Error searching cities:', error);
            
        }
    });
};
