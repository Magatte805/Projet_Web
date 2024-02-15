const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const termeRecherche = req.query.q;

        if (!termeRecherche) {
            return res.status(400).json({ message: 'Le terme de recherche est manquant.' });
        }

        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${termeRecherche}`);
        const resultats = response.data;

        res.json(resultats);
    } catch (error) {
        console.error('Erreur lors de la recherche d\'adresse :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la recherche d\'adresse.' });
    }
});

module.exports = router;


