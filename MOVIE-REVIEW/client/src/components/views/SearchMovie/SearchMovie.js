import { Divider } from 'antd';
import React from 'react'
import './style.css';

function SearchMovie() {
    const MOVIE_DB_API = 'd8bf019d0cca372bd804735f172f67e8';
    const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
    const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
    const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';
    
    const searchButton = document.querySelector('#search');
    const searchInput = document.querySelector('#exampleInputEmail1');
    const moviesContainer = document.querySelector('#movies-container');
    const moviesSearchable = document.querySelector('#movies-searchable');
    
    const INITIAL_SEARCH_VALUE = 'hdhthyutyhubvdtygsdf';
    const log = console.log;
    
    return (
        <div>
            <div className="container">
                {/* <h1>Welcome to Movie App</h1> */}
                <form>
                    <div className="form-group">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search..." />
                        </div>
                            <button type="submit" onClick={shoot} className="btn" id="search">
                                Search a movie
                            </button>
                        </form>
                    <div id="movies-searchable" />
            </div>

        </div>

    )




// document.onclick = function (event) {
//     log('Event: ', event);
//     const { tagName, id } = event.target;
//     if (tagName.toLowerCase() === 'img') {
//         const movieId = event.target.dataset.movieId;
//         const section = event.target.parentElement.parentElement;
//         const content = section.nextElementSibling;
//         content.classList.add('content-display');
//         // getVideosByMovieId(movieId, content);
//         alert(movieId);
//     }

//     if (id === 'content-close') {
//         const content = event.target.parentElement;
//         content.classList.remove('content-display');
//     }
// }
function resetInput() {
    searchInput.value = '';
}


function shoot(event) {
    event.preventDefault();
        const value = searchInput.value;
        
        if (value) {
            searchMovie(value);
        }
        resetInput()
}





// Inserting section before content element
function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = template;
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}

function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
       <a href="/movie/${id}"><img src="${imageUrl}" alt="" data-movie-id="${id}" ></a>
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}


function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
    
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}


function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    console.log(data);
    moviesSearchable.appendChild(moviesBlock);
}


function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}
//siderman-> 
function searchMovie(value) {               
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}

searchMovie(INITIAL_SEARCH_VALUE);

    
}

export default SearchMovie