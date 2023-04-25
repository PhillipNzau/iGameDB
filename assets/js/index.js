
// Usage
/*GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY*/

const rawgAPI = '462e2afdaf9f4f94ac3f237773ee1818';
const apiUrl = `https://api.rawg.io/api/games?key=${rawgAPI}`;

let allGames;

const mainView = document.getElementById('mainView');
const selectedView = document.getElementById('selectedView');
const listGames = document.getElementById('gameList');
const gameContainer = document.querySelector('.game-container');

const backButton = document.getElementById('backBtn');
const searchButton = document.getElementById('searchBtn');
const searchGameInput = document.getElementById('searchGame');

//Selected View
const selectedGameImage = document.getElementById('#selectedGameImage');
const selectedGameSummary = document.getElementById('#selectedGameSummary');
const selectedGameGenre = document.getElementById('#selectedGameGenre');



let isGameViewed = false;



// 1. Handle page view change
const handleClick = ()=> {

  if(isGameViewed === false) {
    mainView.classList.add('hidden');
    selectedView.classList.remove('hidden');
    isGameViewed = !isGameViewed;
  } else {
      mainView.classList.remove('hidden');
      selectedView.classList.add('hidden');
      isGameViewed = !isGameViewed;
  }
}


/// 3. Show game details 
const showGameDetails = (game) => {
  selectedGameImage.src = game.background_image;
  selectedGameSummary.innerText = game.description;

  // Create the genre elements
  for (let genre of game.genres ) {
    const genreName = document.createElement('p');
    genreName.classList.add('gameGenre')
    genreName.innerText = genre.name;
  }

}

/// 4. Show Game List
const showGameList = (games) => {
  for(let game of games) {
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

    listGames.appendChild(gameCont);


  }

}


// 2. Get all games
const getAllGames = async (url) => {
  const cachedData = JSON.parse(localStorage.getItem('games') || '[]');
  console.log('before',cachedData);
  if (cachedData.length > 1) {
    console.log('Using cached data:', cachedData);
    allGames = cachedData
    showGameList(allGames);
    return;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    allGames = data.results;
    localStorage.setItem('games', JSON.stringify(allGames))
    showGameList(allGames);
    console.log(allGames);
    return showGameList(allGames);
  } catch (error) {
    console.error(error);
    throw new ErrorEvent('Failed to fetch data');
  }
}


getAllGames(apiUrl)

backButton.addEventListener('click',handleClick);
gameContainer.addEventListener('click',handleClick);