
// Usage
/*GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY*/

const rawgAPI = '462e2afdaf9f4f94ac3f237773ee1818';
const url = `https://api.rawg.io/api/games?key=${rawgAPI}`;

let gameList;

const mainView = document.getElementById('mainView');
const selectedView = document.getElementById('selectedView');
const gameContainer = document.querySelector('.game-container');

const backButton = document.getElementById('backBtn');
const searchButton = document.getElementById('searchBtn');
const searchGameInput = document.getElementById('searchGame');

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

// 2. Get all games
const getAllGames = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    gameList = data;
    return gameList;
  } catch (error) {
    console.error(error);
    throw new ErrorEvent('Failed to fetch data');
  }
}

/// 3. 

// getAllGames()

backButton.addEventListener('click',handleClick);
gameContainer.addEventListener('click',handleClick);