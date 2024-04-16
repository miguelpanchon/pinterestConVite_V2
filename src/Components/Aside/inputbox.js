import { searchQuery } from '../../main.js'
import { query } from '../../main.js'
import { apiKey } from '../../config.js'
import { photosContainer } from '../../main.js'
import { no_photos } from '../../main.js';


// Use async and await to make a single petition to the Unsplash API
// Keep track of photo IDs
const displayedPhotoIds = new Set();

export async function fetchPhotos(page) {
    try {
        const url = `https://api.unsplash.com/search/photos?&page=${page}&query=${query}&per_page=10&client_id=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const photos = data.results;

        // Check if the array of photos is empty
        if (photos.length === 0) {
            photosContainer.innerHTML = '';
            no_photos.innerHTML = '<p class="no-photos-message">No photos found</p>';
            searchQuery.placeholder = "Type something else";
            return;
        }

        // Paint each photo and create a link to the picture
        photos.forEach(photo => {
            // Check if photo ID is already displayed
            if (!displayedPhotoIds.has(photo.id)) {
                const img = document.createElement('img');
                const link = document.createElement('a');
                link.href = photo.links.html;
                link.target = "_blank";
                img.classList.add('card');
                img.src = photo.urls.small;
                img.alt = photo.description || 'An Unsplash photo';
                link.appendChild(img);
                photosContainer.appendChild(link);

                // Add photo ID to the set of displayed IDs
                displayedPhotoIds.add(photo.id);
            }
        });

    } catch (error) {
        console.error(error);
        alert('An error occurred while searching for photos.');
    }
}
