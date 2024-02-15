const express = require('express');
const indexRouter = require('./Routes/getRechercheVille.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/API1', (req, res) => {
    const termeRecherche = req.query.q;
    if (!termeRecherche) {
        return res.status(400).send('Le terme de recherche est manquant.');
    }
    res.redirect(`/`); 
});

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur le port ${PORT}`);
});



module.exports = app;

//API1 : https://api-adresse.data.gouv.fr/search/?q=${termeRecherche} : API BAN 