
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

//Selected View
const selectedGameImage = document.getElementById('selectedGameImage');
const selectedGameSummary = document.getElementById('selectedGameSummary');
const selectedGameGenre = document.getElementById('selectedGameGenre');


let isGameViewed = false;


// 1. Handle page view change
const handleClick = (e)=> {
  gameId = e.target.parentElement.id; 
  if(isGameViewed === false) {
    console.log(gameId);
    const singleGameUrl = `https://api.rawg.io/api/games/${gameId}?key=${rawgAPI}`;

    getSelectedGame(singleGameUrl)
    mainView.classList.add('hidden');
    selectedView.classList.remove('hidden');
    isGameViewed = !isGameViewed;
  } else {
      selectedGameImage.src = './assets/imgs/game1.jpg'
      selectedGameSummary.innerHTML = 'Loading';
      selectedGameGenre.innerText = '';
      mainView.classList.remove('hidden');
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
  console.log('the top games',topGame);
  for(let topGame of topGames) {
    const gameSlider = document.createElement('div');
    gameSlider.classList.add('swiper-slide');
    generateContainer(topGame, gameSlider, swiperWrapper);
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
// 2. Get all games
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


getAllGames(apiUrl)

backButton.addEventListener('click',handleClick);
// gameContainer.addEventListener('click',handleClick);