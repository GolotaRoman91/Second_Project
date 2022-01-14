import '../styles/loader.css';
import '../styles/moviePage.css';
import '../styles/footer.css';
import '../styles/header.css';
require('../image/bg.jpg');
require('../image/defoultBackgroundMainPage.png');
import 'regenerator-runtime/runtime';
import { constants, URL } from './constans';
import { genresType, movieResponse } from './types';
import { loader } from './loader';
import { DOM } from './dom';
import { elemRecomendedFilm } from './types';
const axios = require('axios').default;

loader();

const getGenres = async (genres_ids: number[]): Promise<string> => {
    try {
        const response = await axios.get(URL.genres + document.cookie);
        const genres = response.data;
        setJustWatch(genres_ids);
        return setGenresForMovie(genres, genres_ids);
    } catch (error) {
        console.error(error);
    }
};

async function setJustWatch(genreId) {
    try {
        const justWatch = await axios.get(URL.movies + `id=${constants.idMovie}&genre_id=${genreId[0]}&perPage=3&` + document.cookie);
        fillJustWatch(justWatch.data.movies);
    } catch (error) {
        console.error(error);
    }
}

function fillJustWatch(justWatchData: Array<elemRecomendedFilm>) {
    justWatchData.forEach(element => {
        DOM.justWatch.innerHTML += `
        <div class="cartJustWatchFilm" id="${element.id}">
           <img src=${URL.image}${element.backdrop_path} class="posterJustWatch">
            <div class="descriptionWrapper">
                <span class="cartFilmTitle"> ${element.title}</span></br>
                <span class="cartFilmTagline"> ${element.tagline}</span>
            </div>
        </div>`;
    });
}
function setGenresForMovie(genres: genresType[], genres_ids: unknown[]): string {
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
        const response = await axios.get(URL.moviesId + `?id=${constants.idMovie}&` + document.cookie);
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

function renderMovieData(movie: movieResponse): void {
    DOM.poster.src = `${URL.image}${movie.backdrop_path}`;
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
function getCurrentJustWatchFilmId(event: Event): void {
    const target = event.target;
    if ((<HTMLElement>target).className === 'posterJustWatch') {
        const currentFilmId = (<HTMLElement>target).parentElement.id;
        openJustMainPage(currentFilmId);
    } else {
        return;
    }
}
export function openJustMainPage(currentFilmId: string): void {
    window.open(`./moviePage.html#${currentFilmId}`);
}
DOM.justWatch.addEventListener('click', getCurrentJustWatchFilmId);
