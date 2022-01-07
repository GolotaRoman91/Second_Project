import { DOM } from './dom'
import { constants } from "./constans";
import { domElement } from "./constans";
import { filterData } from "./constans";
import { variable } from "./constans";
import { creatFirstPage } from './showMovie';
import { movie } from "./types";

export const showFilters = (): void => {
    domElement.containerFilter.style.display = 'block';
}

export const getFilms = (event: Event): boolean => {
    if ((<HTMLElement>event.target).tagName !== 'LI') {
        return false
    }

    if (!filterData.genre_ids.includes(+(<HTMLElement>event.target).id)) {
        filterData.genre_ids.push(+(<HTMLElement>event.target).id);
    }
}

export const filterByiD = (evt: Event): void => {
    filterData.id = Number((<HTMLInputElement>evt.target).value);
}

export const filterByLanguage = (evt: Event): void => {
    filterData.original_language = (<HTMLInputElement>evt.target).value;
}

const handFiltGenre = (movies: movie[], genresList) => {
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

const handleById = (movies: movie[], key: string, value: string): string[] => {
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

export function openCloseFilters(evt: Event) {
    DOM.filter.className === 'filter hidden' ? DOM.filter.className = 'filter' : DOM.filter.className = 'filter hidden';
}

export function changeColorGenres(evt: Event) {
    ((<HTMLElement>evt.target).style.color !== 'red') ? (<HTMLElement>evt.target).style.color = 'red' : (<HTMLElement>evt.target).style.color = 'white';
}

export const resetFilter = (): void => {
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
