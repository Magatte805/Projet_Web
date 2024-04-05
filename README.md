Description:
Ce projet est une application web crée par MAGATTE LO et SALEM LUKAU MAKIESE qui permet aux utilisateurs de rechercher des restaurants dans différentes villes.
L'application utilise deux API différentes : une pour rechercher des villes et une autre pour rechercher des restaurants.

Fonctionnalités: 
Recherche de villes : Les utilisateurs peuvent rechercher des villes en saisissant un nom dans le champ de recherche. Les résultats sont affichés en temps réel sous forme de liste déroulante.

Affichage des restaurants : Une fois une ville sélectionnée, l'application affiche une liste de restaurants disponibles dans cette ville ou "Pas de restaurant trouvé" si y'en a pas dans cette ville.
Les informations sur chaque restaurant comprennent le nom, le type de cuisine, l'adresse et les heures d'ouverture.

API Utilisées:
API (BAN) de recherche de villes : L'application utilise l'API de recherche de villes fournie par le gouvernement français. 
Cette API permet de rechercher des villes à partir d'un terme de recherche donné. : https://api-adresse.data.gouv.fr/search/

API de recherche de restaurants : L'application utilise l'API Overpass pour rechercher des restaurants dans une ville donnée. De plus, elle intègre  l'API Nominatim pour déterminer les coordonnées géographiques de la ville spécifiée. Cela permet à l'application de localiser précisément la ville et de rechercher les restaurants à proximité en fonction de ces coordonnées.
Cette API Overpass  récupère les données des éléments OSM (OpenStreetMap) et filtre les nœuds avec l'attribut "amenity" égal à "restaurant": https://overpass-api.de/api/interpreter


Installation et Utilisation: 

Installation des dépendances : Avant de lancer l'application, assurez-vous d'avoir installé Node.js sur votre machine. 
Ensuite, exécutez la commande suivante pour installer les dépendances nécessaires : npm install

Lancement de l'application  : Une fois les dépendances installées, vous pouvez lancer l'application en exécutant la commande suivante : node app.js

Accès à l'application : Ouvrez un navigateur web et accédez à l'adresse suivante :http://localhost:3001


Test Unitaires :  
Nous avons inclus des tests unitaires pour les deux API utilisées dans cette application. Ces tests sont écrits avec le framework Jest et visent à garantir le bon fonctionnement des fonctionnalités clés de nos API.
Pour lancer le dossier test ,  exécutez la commande suivante pour installer les dépendances nécessaires : npm install --save-dev jest
pour exécuter les tests  : npx jest



