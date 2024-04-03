// Test unitaire sur les 2 API 

const axios = require('axios');


// API1 recherche ville 

//test1: Recherche de ville avec succés
test('Recherche de ville avec succès', async () => {
  const query = 'Paris';
  const response = await axios.get(`http://localhost:3000/search?query=${query}`);
  
  // Vérification des résultats
  expect(response.status).toBe(200); 
  expect(response.data).toEqual(expect.arrayContaining(['Paris']));
});


//test2: Rechercher une ville avec une requête invalide 
test("Recherche de ville avec une requête invalide", async () => {
    const query = 'InvalidCity';
    const response = await axios.get(`http://localhost:3000/search?query=${query}`);
    expect(response.status).toBe(200); 
  
    // Vérifier que la réponse ne contient pas de résultats
    expect(response.data).toEqual([]);
  });
  

// Test4: Recherche de ville avec une ville inexistante
test('Recherche de ville avec une ville inexistante', async () => {
  const query = 'VilleInexistante';
  const response = await axios.get(`http://localhost:3000/search?query=${query}`);
  
  // Vérification des résultats
  expect(response.status).toBe(200); 
  expect(response.data).toEqual([]);
});











//API 2 : recherche restaurant 

// Test1: Test de réussite de la récupération des restaurants
test('Récupération des restaurants avec succès', async () => {
  const cityName = 'Paris';
  const response = await axios.get(`http://localhost:3000/restaurants?cityName=${cityName}`);
  
  // Vérification des résultats
  expect(response.status).toBe(200); 
  expect(response.data).toEqual(expect.arrayContaining([])); 
});


// Test2: Test de récupération des restaurants avec une ville invalide
test("Récupération des restaurants avec une ville invalide", async () => {
    const cityName = 'InvalidCity';
    const response = await axios.get(`http://localhost:3000/restaurants?cityName=${cityName}`);
    
    // Vérification des résultats
    expect(response.status).toBe(200); 
    expect(response.data).toEqual([]); 
});


