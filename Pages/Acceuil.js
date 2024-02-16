// Fonction pour animer le texte progressivement
function animateText(text, targetElement, delay) {
    const words = text.split(' '); // Sépare le texte en mots
    let index = 0;

    function displayWords() {
        if (index < words.length) {
            targetElement.textContent += words[index] + ' '; 
            index++;
            setTimeout(displayWords, delay);
        }
    }

    displayWords(); // Démarre l'animation
}

// Appel de la fonction d'animation au chargement de la page
window.onload = function() {
    const welcomeText = "L'application vous permet de rechercher des villes de France et de voir pour chaque ville les entreprises qui proposent de l'alternance.";
    const targetElement = document.querySelector('.welcome-container p'); 
    animateText(welcomeText, targetElement, 200); 
};


    