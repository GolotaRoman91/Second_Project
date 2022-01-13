import '../styles/loader.css';
import '../styles/moviePage.css';
import '../styles/footer.css';
import '../styles/header.css';
require('../image/bg.jpg');
require('../image/defoultBackgroundMainPage.png');
import 'regenerator-runtime/runtime';
import { constants } from './constans';
import { genresType } from './types';
import { loader } from './loader';
import { DOM } from './dom';
const axios = require('axios').default;

loader();

const getGenres = async (genres_ids: number[]): Promise<string> => {
    try {
        const response = await axios.get('http://127.0.0.1:3001/genres');
        console.log(genres_ids);
        const genres = response.data;
        setJustWatch(genres_ids);
        return setGenresForMovie(genres, genres_ids);
    } catch (error) {
        console.error(error);
    }
};
async function setJustWatch(genreId) {
    const justWatch = await axios.get(`http://127.0.0.1:3001/movies?id=${constants.idMovie}&genre_id=${genreId[0]}&perPage=3`);
    console.log(justWatch.data);
    fillJustWatch(justWatch.data);
}
function fillJustWatch(justWatchData) {
    justWatchData.forEach(element => {
        console.log(element);
        DOM.justWatch.innerHTML += `
        <div class="cartJustWatchFilm" id="${element.id}">
           <img src=${constants.URLIMG}${element.backdrop_path} class="posterJustWatch">
            <div class="descriptionWrapper">
                <span class="cartFilmTitle"> ${element.title}</span></br>
                <span class="cartFilmTagline"> ${element.tagline}</span>
            </div>
        </div>`;
    });
}
// <div class="descriptionJustWatchWrapper">
//                <span class="cartJustWatchTitle">${element.title}</span>
//                ${element.tagline}
//            </div>
function setGenresForMovie(genres: genresType[], genres_ids: any[]): string {
    genres_ids = [...new Set(genres_ids)];
    let stringGenres = '';
    const filteredGeners = genres.filter(el => genres_ids.includes(el.id));
    filteredGeners.forEach(elem => {
        stringGenres += elem.name + ', ';
    });
    return stringGenres.slice(0, stringGenres.length - 2);
}

const getMovie = async (): Promise<void> => {
    try {
        const response = await axios.get(`http://127.0.0.1:3001/movies/id?id=${constants.idMovie}`);
        console.log(response);
        const movie = response.data[0];
        movie.genres = await getGenres(movie.genres);
        renderMovieData(movie);
    } catch (error) {
        console.error(error);
    }
};
getMovie();

function setData(data: string | string[], attribute): void {
    attribute.textContent = data;
}

function isAdult(adult: boolean): string {
    if (adult === true) {
        return 'yes';
    } else {
        return 'no';
    }
}

function sliceDate(release_date: string | string[]): string | string[] {
    return release_date.slice(0, 10);
}

function renderMovieData(movie: {
    backdrop_path: string;
    original_title: string;
    original_language: string;
    release_date: string;
    movie_rate: string;
    adult: boolean;
    budget: string;
    popularity: string;
    overview: string;
    title: string;
    genres: string;
    trailer: string;
}): void {
    DOM.poster.src = `${constants.URLIMG}${movie.backdrop_path}`;
    DOM.trailer.setAttribute('src', `https://www.youtube.com/embed/${movie.trailer}`);
    setData(movie.title, DOM.mainPageTitle);
    setData(movie.original_title, DOM.originalTitle);
    setData(movie.original_language, DOM.language);
    setData(sliceDate(movie.release_date), DOM.date);
    setData(isAdult(movie.adult), DOM.filmAdult);
    setData(movie.budget, DOM.filmRevenue);
    setData(movie.popularity, DOM.filmPopularity);
    setData(movie.overview, DOM.description);
    setData(movie.title, DOM.title);
    setData(movie.genres, DOM.filmGenres);
}
function getCurrentJustWatchFilmId(event) {
    const target = event.target;
    if ((<HTMLElement>target).className === 'posterJustWatch') {
        const currentFilmId = (<HTMLElement>target).parentElement.id;
        openJustMainPage(currentFilmId);
    } else {
        return;
    }
}
export function openJustMainPage(currentFilmId) {
    window.open(`./moviePage.html#${currentFilmId}`);
}
DOM.justWatch.addEventListener('click', getCurrentJustWatchFilmId);
