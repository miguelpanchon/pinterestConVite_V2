import './styles/1-normalize.css'
import './styles/2-styles.css'
import './styles/3-layout-mobile.css'
import './styles/4-layout-mobile-plus.css'
import './styles/5-layout-tablet.css'
import './styles/6-layout-pc.css'

import './Components/Aside/aside.css'
import './Components/Aside/inputbox.css'

// import './Componentes/EspacioBlanco/EspacioBlanco.css'

import './Components/CentralMain/card.css'
import './Components/CentralMain/centralMain.css'

import './Components/Footer/Footer.css'



import { fetchPhotos } from "./Components/Aside/inputbox.js"



// *****
export const photosContainer = document.getElementById('photos');
export const no_photos = document.getElementById('no_photos');
export const searchButton = document.getElementById('search-button');
export var searchQuery = document.getElementById('search-query');
export var query = "random";
export var borrar = 0;




// invoke as many times fetchPhot as permited by user rights, passing page as the parameter
function fetch3times() {
  for (let page = 1; page <= 1; page++) {
    fetchPhotos(page);

  }
}

function deletePics() {
  photosContainer.innerHTML = '';
  query = "random";
}


fetch3times();


// ********************
// event listeners
// ********************

// function triggered when clicking on the logoMP
function logoClick() {
  searchQuery.value = "";
  query = 'random';
  photosContainer.innerHTML = '';
  fetch3times();
  no_photos.innerHTML = '';
}

//**********  Add the event listener for the logoMP
const imgLogo = document.querySelector('.img_logo');

imgLogo.addEventListener('click', function () {
  logoClick();
});




//*********** Add event listener when CLICKING on the SEARCH BUTTON
searchButton.addEventListener('click', function () {

  query = searchQuery.value.trim();
  if (query == "") {
    no_photos.innerHTML = '';
    photosContainer.innerHTML = '';
    searchQuery.placeholder = "type SOMEHTING...  ";

    // alert('Query was empty. Please enter a text to search for');
  }
  //clean before painting again and 
  photosContainer.innerHTML = '';
  no_photos.innerHTML = '';
  fetch3times();
});


//************ add event listener when pressing ENTER in the SEARCH BOX
searchQuery.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});