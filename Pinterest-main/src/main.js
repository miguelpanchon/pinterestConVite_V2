import './styles/1-normalize.css'
import './styles/2-styles.css'
import './styles/3-layout-mobile.css'
import './styles/4-layout-mobile-plus.css'
import './styles/5-layout-tablet.css'
import './styles/6-layout-pc.css'

import './Components/Aside/aside.css'
import './Components/Aside/inputbox.css'

import './Components/CentralMain/card.css'
import './Components/CentralMain/centralMain.css'

import './Components/Footer/Footer.css'


const apiKey = "cAj-bkv52llpzfZ2ndbLnZdc3PQ65lZvne5Kj5ArDQ4";
const photosContainer = document.getElementById('photos');
// ***
const no_photos = document.getElementById('no_photos');
const searchButton = document.getElementById('search-button');
var searchQuery = document.getElementById('search-query');
var query = "random";
var borrar = 0;

// Use async and await to make a single petition to the Unsplash API
async function fetchPhotos(page) {
  try {
    const url = `https://api.unsplash.com/search/photos?&page=${page}&query=${query}&per_page=50&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const photos = data.results;
    // Check if the array of photos is empty
    if (photos.length === 0) {
      photosContainer.innerHTML = '';
      no_photos.innerHTML = '<p class="no-photos-message">No photos found</p>';
      return;
    }
    //paint each phot AND create a link to the picture
    //new
    photos.forEach(photo => {
      const img = document.createElement('img');
      const link = document.createElement('a');
      link.href = photo.links.html;
      link.target = "_blank";
      img.classList.add('card');
      img.src = photo.urls.small;
      img.alt = photo.description || 'An Unsplash photo';
      link.appendChild(img);
      photosContainer.appendChild(link);
    });

    /*old,  working but no link to the picture
        photos.forEach(photo => {
          const img = document.createElement('img');
          img.classList.add('card');
          img.src = photo.urls.small;
          img.alt = photo.description || 'An Unsplash photo';
          photosContainer.appendChild(img);
        });
    */
  }
  catch (error) {
    console.error(error);
    alert('An error occurred while searching for photos.');
  }
}


// invoke as many times fetchPhot as permited by user rights, passing page as the parameter
function fetch3times() {
  for (let page = 1; page <= 3; page++) {
    fetchPhotos(page);
  }

}

fetch3times();

//event listener when clicking on the button
searchButton.addEventListener('click', function () {

  query = searchQuery.value.trim();
  if (query == "") {
    no_photos.innerHTML = '';
    query = "random";
    // alert('Please enter a search query.');
    // return;
  }
  //clean before painting again and 
  //if searching for a specific term only return the result of one page (there could be too few pictures)
  photosContainer.innerHTML = '';
  fetch3times();
  no_photos.innerHTML = '';
});



// event listener when clickin on the logo
const imgLogo = document.querySelector('.img_logo');

imgLogo.addEventListener('click', function () {
  logoClick();
});


function logoClick() {
  searchQuery.value = "";
  photosContainer.innerHTML = '';
  fetch3times();
  no_photos.innerHTML = '';

}