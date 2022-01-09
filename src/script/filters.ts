import { DOM } from './dom';
import { constants } from './constans';
import { domElement } from './constans';
import { filterData } from './constans';
import { variable } from './constans';
import { creatFirstPage } from './showMovie';
import { movie } from './types';

export const showFilters = (): void => {
    domElement.containerFilter.style.display = 'block';
};

export const getFilms = (event: Event): boolean => {
    if ((<HTMLElement>event.target).tagName !== 'LI') {
        return false;
    }

    if (!filterData.genre_ids.includes(+(<HTMLElement>event.target).id)) {
        filterData.genre_ids.push(+(<HTMLElement>event.target).id);
    }
};

export const filterByiD = (evt: Event): void => {
    filterData.id = Number((<HTMLInputElement>evt.target).value);
};

export const filterByLanguage = (evt: Event): void => {
    filterData.original_language = (<HTMLInputElement>evt.target).value;
};

const handFiltGenre = (movies: movie[], genresList) => {
    const temporaryArr = [];
    // Фильтер массива по жанрам
    movies.forEach(movie => {
        genresList.forEach(genre => {
            if (movie.genres.includes(genre) && !temporaryArr.includes(movie)) {
                return temporaryArr.push(movie);
            }
        });
    });

    return temporaryArr;
};

const handleById = (movies: movie[], key: string, value: string): string[] => {
    const temporaryArr = [];

    movies.forEach(movie => {
        if (value === movie[key]) {
            return temporaryArr.push(movie);
        }
    });

    return temporaryArr;
};

const handleByBudget = (movies): any => {
    const temporaryArr = [];
    movies.forEach(movie => {
        if (movie.budget >= DOM.minBudget.dataset.value && movie.budget <= DOM.maxBudget.dataset.value) {
            console.log(DOM.minBudget.dataset.value);
            console.log(DOM.maxBudget.dataset.value);
            temporaryArr.push(movie);
        }
    })

    return temporaryArr;
}

const handleByData = (movies): any => {
    const temporaryArr = [];
    movies.forEach(movie => {
        if (new Date(movie.release_date).getTime() >= new Date(DOM.minDate.value).getTime()
            && new Date(movie.release_date).getTime() <= new Date(DOM.maxDate.value).getTime()) {
            temporaryArr.push(movie);
        }
    })

    return temporaryArr;
}

export const showFilms = () => {
    const filtredByGenre = handFiltGenre(constants.movies, filterData.genre_ids);
    const filterByBudget = handleByBudget(filtredByGenre.length ? filtredByGenre : constants.movies);

    const filteredData = handleByData(filtredByGenre.length ? filterByBudget ?? filtredByGenre : constants.movies);
    const filteredByLang = handleById(filtredByGenre.length ? filteredData ?? filtredByGenre ?? filterByBudget : constants.movies, 'original_language', filterData.original_language);
    console.log('----------------------------------------------------------');
    console.log(filteredByLang);
    console.log('----------------------------------------------------------');

    if (filtredByGenre.length) {
        // constants.filteredFilms = [];
        constants.filteredFilms = [...filtredByGenre];
        console.log('+++')
    }
    if (filterByBudget.length) {
        // constants.filteredFilms = [];
        constants.filteredFilms = [...filterByBudget];
        console.log('++++')
    }
    if (filteredData.length) {
        constants.filteredFilms = [...filteredData];
        console.log('+')
    }
    if (filteredByLang.length) {
        // constants.filteredFilms = [];
        constants.filteredFilms = [...filteredByLang];
        console.log('++')
    }


    console.log(constants.filteredFilms.length);

    creatFirstPage(constants.filteredFilms, 1);
    DOM.filter.classList.toggle('hidden');
};

export function openCloseFilters() {
    DOM.filter.classList.toggle('hidden');
}

export function changeColorGenres(evt: any) {
    evt.target.classList.toggle('filmGenresActiv');
}

export function closeFilter(evt) {
    if (evt.target.className === 'filter') {
        openCloseFilters()
    }
}

export const resetFilter = (): void => {
    filterData.genre_ids = [];
    filterData.id = null;
    filterData.release_date = null;
    filterData.original_language = null;
    filterData.budget = null;
    filterData.adult = null;

    variable.skip = 0;
    constants.filteredFilms = [];
    creatFirstPage(constants.movies, 0);
    // domElement.containerFilter.style.display = 'none';
    // DOM.filter.classList.toggle('hidden');
    clearFiltersGenres();
    (<HTMLInputElement>document.querySelector('#selectLanguage')).value = '';
};

function clearFiltersGenres() {
    const genresList = Array.from(document.querySelectorAll('.filmsGenres'));
    genresList.forEach(element => {
        element.classList.remove('filmGenresActiv');
    });
}
