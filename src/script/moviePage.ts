import '../styles/moviePage.css'
require('../image/bg.jpg');
require('../image/adv.gif');
require('../image/tempMovieImage.jpg');
require('../image/media_player.png');
import "regenerator-runtime/runtime";
import { constants } from "./constans";
const axios = require('axios').default;
const originalTitle = document.querySelector('.film_original_name')
const date = document.querySelector('.film_date')
const genres = document.querySelector('.film_genres')
const rate = document.querySelector('.film_rate')
const filmRevenue = document.querySelector('.film_revenue')
const filmAdult = document.querySelector('.film_adult')
const filmPopularity = document.querySelector('.film_popularity')
const language = document.querySelector('.film_languages')
const poster: HTMLImageElement = document.querySelector('.poster')
const description = document.querySelector('.description')
const title = document.querySelector('.film_name')

const getGenres = async (genres_ids) => {
    try {
        const response = await axios.get('https://wowmeup.pp.ua/genres');
        const genres = response.data.genres
        return setGenresForMovie(genres, genres_ids)

    } catch (error) {
        console.error(error);
    }

}

function setGenresForMovie (genres, genres_ids) {
    genres_ids  = [...new Set(genres_ids)]
    let stringGenres = ''
    genres_ids.forEach(elem => {
        stringGenres += genres[elem-1].name + ', '
    })
    return stringGenres.slice(0,stringGenres.length-2)
}

const getMovie = async () => {
    try {
        const response = await axios.get('https://wowmeup.pp.ua/movie/4');
        const movie = response.data.movie
        movie.genre_ids = await getGenres(movie.genre_ids)
        renderMovieData (movie)
    } catch (error) {
        console.error(error);
    }
}

getMovie()


function setData(data, attribute) {
    attribute.textContent = data
}

function isAdult(adult) {
    if (adult === true) {
        return 'yes'
    } else {
        return 'no'
    }
}

function sliceDate(release_date) {
    return release_date.slice(0, 10);
}

function renderMovieData (movie) {
    poster.src = `${constants.URLIMG}${movie.backdrop_path}`
    setData(movie.original_title, originalTitle)
    setData(movie.original_language, language)
    setData(sliceDate(movie.release_date), date)
    setData(movie.movie_rate, rate)
    setData( isAdult(movie.adult), filmAdult)
    setData(movie.revenue, filmRevenue)
    setData(movie.popularity, filmPopularity)
    setData(movie.overview, description)
    setData(movie.title, title)
    setData(movie.genre_ids, genres)
}





