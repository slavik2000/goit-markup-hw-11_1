import { fetchImages, PER_PAGE} from '../js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const buttonSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

// нужно для SimpleLightbox
// const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//     top: cardHeight * 2,

//     behavior: 'smooth',
// });

buttonLoadMore.style.display = 'none';

let pageNumber = 1;

buttonSearch.addEventListener('click', async (evt) => {
    evt.preventDefault();
    cleanGallery();

    const inputValue = input.value.trim();
    console.log(inputValue);         // string

    if (inputValue !== '') {
        const foundData = await fetchImages(inputValue, pageNumber);
        // console.log(foundData);

        if (foundData.hits.length === 0) {
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            return;
        }

        createMarkup(foundData.hits);
        Notiflix.Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
        buttonLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
        
    }
});

buttonLoadMore.addEventListener('click', async (evt) => {
    pageNumber+=1;
    buttonLoadMore.style.display = 'none';

    const inputValue = input.value.trim();

    const foundData = await fetchImages(inputValue, pageNumber);

        if (foundData.hits.length === 0) {
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        } else if (foundData.hits.length < PER_PAGE) {
            createMarkup(foundData.hits);
            Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
            buttonLoadMore.style.display = 'none';
        } else {
            console.log(foundData.hits);
            createMarkup(foundData.hits);
            Notiflix.Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
            buttonLoadMore.style.display = 'block';
        }
});

function createMarkup(images) {
    console.log(images);
    const markup = images.map(image => {
            // console.log(image);
            return `<div class="photo-card">
                <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
                <div class="info">
                    <p class="info-item"><b>Likes</b> <span class="info-item-api">${image.likes}</span></p>
                    <p class="info-item"><b>Views</b> <span class="info-item-api">${image.views}</span></p>
                    <p class="info-item"><b>Comments</b> <span class="info-item-api">${image.comments}</span></p>
                    <p class="info-item"><b>Downloads</b> <span class="info-item-api">${image.downloads}</span></p>
                </div>
            </div>`;
        })
        .join('');
    gallery.innerHTML += markup;
};

function cleanGallery() {
    gallery.innerHTML = '';
    pageNumber = 1;
    buttonLoadMore.style.display = 'none';
};