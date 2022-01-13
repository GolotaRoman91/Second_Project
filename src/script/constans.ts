import { movie } from "./types";
export const constants = {
    URLIMG: 'https://image.tmdb.org/t/p/original',
    requestURLMovie: 'http://127.0.0.1:3001/movies?page=1&perPage=100',
    movies: [] as movie[],
    movieOnPage: 5,
    filteredFilms: [],
    adultFilms: [],
    budgetFilms: [],
    filmByLang: [],
    idMovie: document.URL.split('#')[1]
};
export const variable = {
    totalCount: 0,
    htmlElems: [],
    currentPage: 1,
    numbersPage: 0,
    variable: 0,
    minBudget: 0,
    maxBudget: 0,
    skip: 0,
    limit: 5
};

export const filterData = {
    genre_ids: null,
    id: null,
    release_date: null,
    original_language: null,
    budget: null,
    adult: null,
}
export const requestURLMovie = {
    url: `http://127.0.0.1:3001/movies?`
}