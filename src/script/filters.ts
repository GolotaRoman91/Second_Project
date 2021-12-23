import { DOM } from './dom'
import { constants } from "./constans";
import { domElement } from "./constans";
import { filterData } from "./constans";
import { variable } from "./constans";
import { creatFirstPage } from './showMovie';

export const showFilters = () => {
    domElement.containerFilter.style.display = 'block';
}

export const getFilms = (event) => {
    if (event.target.tagName !== 'LI') {
        return false
    }

    if (!filterData.genre_ids.includes(+event.target.id)) {
        filterData.genre_ids.push(+event.target.id);
    }
}

// const handleFilter = (movies) => {
//     if (movies.length) {
//         constants.filteredFilms = [];
//
//         movies.forEach((movie) => {
//             if (filterData.filmId) {
//                 if (filterData.filmId === movie.id) {
//                     constants.filteredFilms.push(movie);
//                 }
//
//             } else {
//                 switch (true) {
//                     case filterData.lang && filterData.lang === movie.original_language:
//                         constants.filteredFilms.push(movie);
//                         break;
//
//                     case !!filterData.genres.length:
//                         filterData.genres.forEach((genre) => {
//                             if (movie.genre_ids.includes(genre) && !constants.filteredFilms.includes(movie)) {
//                                 constants.filteredFilms.push(movie);
//                             }
//                         })
//                         break;
//                 }
//             }
//
//         })
//     }
// }

export const filterByiD = (evt) => {
    filterData.id = Number(evt.target.value);
}

export const filterByLanguage = (evt) => {
    filterData.original_language = evt.target.value;
}

const handFiltGenre = (movies, genresList) => {
    const temporaryArr = [];

    movies.forEach((movie) => {
        genresList.forEach((genre) => {
            if (movie.genre_ids.includes(genre) && !temporaryArr.includes(movie)) {
                return temporaryArr.push(movie)
            }
        })
    })

    return temporaryArr
}

const handleById = (movies, key, value) => {
    const temporaryArr = [];

    movies.forEach((movie) => {
        if (value === movie[key]) {
            return temporaryArr.push(movie)
        }
    })

    return temporaryArr
}

export const showFilms = () => {
    const filtredByGenre = handFiltGenre(constants.movies, filterData.genre_ids);
    const filteredById = handleById(filtredByGenre.length ? filtredByGenre : constants.movies, 'id', filterData.id);
    const filteredByLang = handleById(filtredByGenre.length ? filtredByGenre : constants.movies, 'original_language', filterData.original_language);


    if (filteredById.length) {
        constants.filteredFilms = [...filteredById];
    } else if (filteredByLang.length) {
        constants.filteredFilms = [];
        constants.filteredFilms = [...filteredByLang]
    } else if (filtredByGenre.length) {
        constants.filteredFilms = [];
        constants.filteredFilms = [...filtredByGenre]
    }

    creatFirstPage(constants.filteredFilms, 0)

    domElement.containerFilter.style.display = 'none';
}

export function openCloseFilters(evt) {
    DOM.filter.className === 'filter hidden' ? DOM.filter.className = 'filter' : DOM.filter.className = 'filter hidden';
}

export function changeColorGenres(evt) {
    (evt.target.style.color !== 'red') ? evt.target.style.color = 'red' : evt.target.style.color = 'white';
}

export const resetFilter = () => {
    // filterData = {
    //     genre_ids: [],
    //     id: null,
    //     release_date: null,
    //     original_language: null,
    //     budget: null,
    //     adult: null,
    // }
    filterData.genre_ids = [];
    filterData.id = null;
    filterData.release_date = null;
    filterData.original_language = null;
    filterData.budget = null;
    filterData.adult = null

    variable.skip = 0;
    constants.filteredFilms = []
    creatFirstPage(constants.movies, 0)
    domElement.containerFilter.style.display = 'none';
}
