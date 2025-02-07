// Sélectionne le conteneur de la galerie
const gallery = document.getElementById('gallery');

// Variables pour gérer l'état du jeu
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Création d'un tableau d'images en double
const images = [];

// Génération des images (10 paires)
for (let i = 1; i <= 10; i++) {
  images.push({ src: `img${i}.png`, id: `${i}a` });
  images.push({ src: `img${i}.png`, id: `${i}b` });
}

// Mélange des images
images.sort(() => 0.5 - Math.random());

// Génération des cartes dynamiquement
images.forEach(image => {
  // Création de la carte
  const card = document.createElement('div');
  card.className = 'card';

  // Création de l'image
  const img = document.createElement('img');
  img.src = image.src;
  img.alt = `Image ${image.id}`;
  img.id = image.id;

  // Ajout de l'image à la carte
  card.appendChild(img);
  gallery.appendChild(card);

  // Ajout de l'événement de clic sur la carte
  card.addEventListener('click', () => {
    if (lockBoard) return; // Empêche le clic si le plateau est verrouillé
    if (card === firstCard) return; // Empêche de cliquer deux fois sur la même carte

    card.classList.add('revealed'); // Révèle la carte

    if (!firstCard) {
      // Si c'est la première carte cliquée
      firstCard = card;
      return;
    }

    // Si c'est la seconde carte cliquée
    secondCard = card;
    lockBoard = true; // Verrouille le plateau pendant la vérification

    checkForMatch();
  });
});

// Fonction pour vérifier si les deux cartes correspondent
function checkForMatch() {
  const isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;

  if (isMatch) {
    // Les cartes correspondent
    disableCards();
    matches++;

    // Vérifie si toutes les paires sont trouvées
    if (matches === 10) {
      setTimeout(() => {
        alert('Félicitations ! Vous avez trouvé toutes les paires !');
        resetGame();
      }, 500);
    }
  } else {
    // Les cartes ne correspondent pas
    unflipCards();
  }
}

// Désactive les cartes correspondantes
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Retourne les cartes si elles ne correspondent pas
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('revealed');
    secondCard.classList.remove('revealed');

    resetBoard();
  }, 1500);
}

// Réinitialise les variables du plateau
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Réinitialise le jeu
function resetGame() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('revealed');
  });

  // Remélange les images
  images.sort(() => 0.5 - Math.random());

  // Met à jour les images sur les cartes
  const imgs = document.querySelectorAll('.card img');
  imgs.forEach((img, index) => {
    img.src = images[index].src;
    img.id = images[index].id;
  });

  matches = 0;
}


