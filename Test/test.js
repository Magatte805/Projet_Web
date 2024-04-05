// Test unitaire sur les 2 API 

const axios = require('axios');


// API1 recherche ville 

//test1: Recherche de ville avec succés
test('Recherche de ville avec succès', async () => {
  const query = 'Paris';
  const response = await axios.get(`http://localhost:3001/search?query=${query}`);
  
  // Vérification des résultats
  expect(response.status).toBe(200); 
  expect(response.data).toEqual(expect.arrayContaining(['Paris']));
});


//test2: Rechercher une ville avec une requête invalide 
test("Recherche de ville avec une requête invalide", async () => {
    const query = 'InvalidCity';
    const response = await axios.get(`http://localhost:3001/search?query=${query}`);
    expect(response.status).toBe(200); 
  
    // Vérifier que la réponse ne contient pas de résultats
    expect(response.data).toEqual([]);
  });
  

// Test3: Recherche de ville avec une ville inexistante
test('Recherche de ville avec une ville inexistante', async () => {
  const query = 'VilleInexistante';
  const response = await axios.get(`http://localhost:3001/search?query=${query}`);
  
  // Vérification des résultats
  expect(response.status).toBe(200); 
  expect(response.data).toEqual([]);
});



//API 2 : recherche restaurant 

// Test de réussite de la récupération des restaurants avec les coordonnées géographiques
test('Récupération des restaurants avec succès', async () => {
  // Coordonnées géographiques de Paris
  const latitude = 48.8566;
  const longitude = 2.3522;

  const response = await axios.get(`http://localhost:3001/restaurants?lat=${latitude}&lon=${longitude}`);
  
  // Vérification des résultats
  expect(response.status).toBe(200); 
  expect(response.data).toEqual(expect.arrayContaining([])); 
});


