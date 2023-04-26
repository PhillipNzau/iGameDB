
// Usage
/*GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY*/

const rawgAPI = '462e2afdaf9f4f94ac3f237773ee1818';
const apiUrl = `https://api.rawg.io/api/games?key=${rawgAPI}`;
let gameId;


let allGames;
let selectedGame;

const mainView = document.getElementById('mainView');
const selectedView = document.getElementById('selectedView');

const swiperWrapper = document.getElementById('topGame');

const listGames = document.getElementById('gameList');
const gameContainer = document.querySelector('.game-container');

const backButton = document.getElementById('backBtn');
const searchButton = document.getElementById('searchBtn');
const searchGameInput = document.getElementById('searchGame');
const mainSection = document.getElementById('mainSection');


//Selected View
const selectedGameImage = document.getElementById('selectedGameImage');
const selectedGameSummary = document.getElementById('selectedGameSummary');
const selectedGameGenre = document.getElementById('selectedGameGenre');

const homeButton = document.getElementById('homeBtn');
const addToFavsButton = document.getElementById('favBtn');
const sideHomeButton = document.getElementById('sideHomeBtn');
const sideAddToFavsButton = document.getElementById('sideFavBtn');

const listTitle = document.getElementById('listTitle');

// Side Nav 
const gameTrailers = document.getElementById('gameTrailers');

let isGameViewed = false;
let search_term = "";
let favs = [];

addEventListener("DOMContentLoaded", (event) => {
  toggleActiveClass('home')
});

/// 1. Get all games
const getAllGames = async (url) => {
  const cachedData = JSON.parse(localStorage.getItem('games') || '[]');
  if (cachedData.length > 1) {
    allGames = cachedData
    showGameList(allGames);
    showSliderGames(allGames)
    return;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    allGames = data.results;
    localStorage.setItem('games', JSON.stringify(allGames))
    showGameList(allGames);
    return showGameList(allGames);
  } catch (error) {
    console.error(error);
    throw new ErrorEvent('Failed to fetch data');
  }
}

/// 2. Handle page view change
const handleClick = (e)=> {
  gameId = e.target.parentElement.id; 
  clearInput();

  
  if(isGameViewed === false) {
    const singleGameUrl = `https://api.rawg.io/api/games/${gameId}?key=${rawgAPI}`;
    getSelectedGame(singleGameUrl)
    mainSection.classList.add('hidden');
    mainSection.classList.remove('myGrid');

    selectedView.classList.remove('hidden');
    isGameViewed = !isGameViewed;
  } else {
      selectedGameImage.src = './assets/imgs/game1.jpg'
      selectedGameSummary.innerHTML = 'Loading';
      selectedGameGenre.innerText = '';
      mainSection.classList.remove('hidden');
      mainSection.classList.add('myGrid');


      selectedView.classList.add('hidden');
      isGameViewed = !isGameViewed;
  }
}

/// 3. Show game details 
const showGameDetails = (game) => {
  selectedGameImage.src = game.background_image;
  selectedGameSummary.innerHTML = game.description;
  selectedGameSummary.classList.add('selected-genre-p')

  // Create the genre elements
  for (let genre of game.genres ) {
    const genreName = document.createElement('p');
    genreName.classList.add('gameGenre')
    genreName.innerText = genre.name;

    selectedGameGenre.appendChild(genreName)
  }
}

/// 4. Show Game List
const showGameList = (games) => {
  for(let game of games) {
    generateContainer(game, listGames)
  }
}

/// 5. show slider games
const showSliderGames = (games) =>{
  topGames = games.filter(game => game.rating >= 4.5);
  for(let topGame of topGames) {
    const gameSlider = document.createElement('div');
    gameSlider.classList.add('swiper-slide');
    generateContainer(topGame, gameSlider, swiperWrapper);
    generateSideNavContainer(topGame,gameTrailers )
  }

}

/// 6. A reusable function to create similar containers
const generateContainer = (game, primaryContainer, secondaryContainer) => {
  const gameCont = document.createElement('div')
    gameCont.classList.add('game-container')
  
    const gameImg = document.createElement('img');
    gameImg.src = game.background_image;
    gameImg.alt = game.name;
    gameImg.classList.add('game-container-img');
  
    const gameDetails = document.createElement('div');
    gameDetails.classList.add('game-container-details');
  
  
    const gameDetailTile = document.createElement('p');
    gameDetailTile.innerText = game.name;
    gameDetailTile.classList.add('game-container-details-tile');
  
    const gameDetailRating = document.createElement('p');
    gameDetailRating.innerText = game.rating;

    gameDetails.appendChild(gameDetailTile);
    gameDetails.appendChild(gameDetailRating);

    gameCont.appendChild(gameImg);
    gameCont.appendChild(gameDetails);

    gameCont.id = game.id

    primaryContainer.appendChild(gameCont);

    // Check if secondary container is passed or not
    if(secondaryContainer) {
      secondaryContainer.appendChild(primaryContainer);
    }

    gameCont.addEventListener('click', handleClick)
}


//// 7. Fetch selected game
const getSelectedGame = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json();
    selectedGame = data;
    return showGameDetails(selectedGame)
  } catch (error) {
    console.error(error);
    throw new ErrorEvent('Failed to fetch data');
  }
}

/// 8. Search for games
const searchForGame = () => {
  listGames.innerHTML = "";
  const games = allGames.filter((item) => {
      return (
        item.name.toLowerCase().includes(search_term) ||
        item.rating.toString().includes(search_term)
      );
    })
    showGameList(games)
};

/// 9.Add to favourite
const addToFavorite = () => {
  // const added = favs.push(selectedGame)
  if(favs.includes(selectedGame)) {
    alert('Game already in your favorites.')
  } else {
    alert("Added to favorites!"); 
    favs.push(selectedGame);
  }
  
  localStorage.setItem('favgames', JSON.stringify(favs));
    
}

const toggleActiveClass = (page) => {
  if(page === 'home') {
    console.log('active home');
    homeButton.classList.add('active');
    sideHomeButton.classList.add('active');
    addToFavsButton.classList.remove('active');
    sideAddToFavsButton.classList.remove('active');
    
  } 
  else if(page === 'fav') {
    console.log('active fav');

    homeButton.classList.remove('active');
    addToFavsButton.classList.add('active');
    sideHomeButton.classList.remove('active');
    sideAddToFavsButton.classList.add('active');
  }
}
/// 10. list fav games
const showFavoriteGames = () => {
  listGames.innerHTML = "";
  mainView.classList.remove('hidden');
  mainSection.classList.remove('hidden');
  mainSection.classList.add('myGrid');

  selectedView.classList.add('hidden');
  isGameViewed = false;

  if (favs.length === 0) {
    listTitle.innerText = 'No Game Added'
  } else {
    listTitle.innerText = 'Your Favorite Games'

  }
 
  // const cachedFavData = JSON.parse(localStorage.getItem('favgames') || '');

  clearInput();
  toggleActiveClass('fav');
  
  showGameList(favs)

}
/// 11. show all games on btn click
const showAllGames =() => {
  listGames.innerHTML = "";
  swiperWrapper.innerHTML = '';
  listTitle.innerText = ''
  listTitle.innerText = 'Popular Games Right NOw'
  
  isGameViewed = false;
  mainView.classList.remove('hidden');
  mainSection.classList.remove('hidden');
  mainSection.classList.add('myGrid');

  selectedView.classList.add('hidden');

  clearInput();


  toggleActiveClass('home');  
  getAllGames(apiUrl)
}

/// 12. Clear input field 
const clearInput = () => {
  searchGameInput.value = '';
  search_term = '';
}

/// 13. Populate trailers side nav
const generateSideNavContainer =(game, primaryContainer) => {
  const frag = document.createDocumentFragment();
  
  const gameCont = document.createElement('div')
  gameCont.classList.add('game-trailer-container')

  const gameImg = document.createElement('img');
  gameImg.src = game.background_image;
  gameImg.alt = game.name;
  gameImg.classList.add('game-trailer-img');

  const gameDetails = document.createElement('div');


  const gameDetailTitle = document.createElement('p');
  gameDetailTitle.innerText = game.name;

  const gameDetailRating = document.createElement('p');
  gameDetailRating.innerText = game.rating;

  

  gameDetails.appendChild(gameDetailTitle);
  gameDetails.appendChild(gameDetailRating);
  gameCont.appendChild(gameImg);
  gameCont.appendChild(gameDetails);
  frag.appendChild(gameCont);

  primaryContainer.appendChild(frag);
}

backButton.addEventListener('click',handleClick);



searchGameInput.addEventListener('input', (e) => {
  search_term = e.target.value.toLowerCase();
  searchForGame()
});
getAllGames(apiUrl)
