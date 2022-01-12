import { DOM } from './dom';
import { constants } from './constans';
import { domElement } from './constans';
import { filterData } from './constans';
import { variable } from './constans';
import { creatFirstPage } from './showMovie';
import { movie } from './types';
const axios = require('axios')

//const selectLanguage = domElement.selectLanguage

export async function getFiltredFilms() {
    let query = `http://127.0.0.1:3001/movies?`
    if (domElement.selectLanguage.value !== "") {
        query += `languages=${domElement.selectLanguage.value}&`
    }
    if (filterData.genre_ids !== null) {
        query += `genre_id=${filterData.genre_ids}&`
    }
    if (DOM.minBudget.dataset.value) {
        query += `budget_min=${DOM.minBudget.dataset.value}&`
    }
    if (DOM.startData.value && DOM.endData.value) {
        query += `minDate=${DOM.startData.value}&maxDate=${DOM.endData.value}&`
    }
    if (DOM.maxBudget.dataset.value) {
        query += `budget_max=${DOM.maxBudget.dataset.value}&`
    }
    const result = await axios.get(query)
    console.log(result)
    constants.filteredFilms = result.data
    console.log(constants.filteredFilms)
    if (result.data === 'Not found') {
        DOM.buttPos.classList.add('hidden')
        DOM.notFoundAlert.classList.remove('hidden')
    } else {
        DOM.notFoundAlert.classList.add('hidden')
        DOM.buttPos.classList.remove('hidden')
        variable.skip = 0;
        creatFirstPage(constants.filteredFilms, 0)
    }
    DOM.filter.classList.toggle('hidden');
}

export const showFilters = (): void => {
    domElement.containerFilter.style.display = 'block';
};

export const getFilms = (event: Event): void => {
    if ((<HTMLElement>event.target).tagName !== 'LI') {
        return;
    } else {
        filterData.genre_ids = (<HTMLElement>event.target).id;
    }

    // if (!filterData.genre_ids) {
    //     filterData.genre_ids = (<HTMLElement>event.target).id;
    // }
};

// export const filterByiD = (evt: Event): void => {
//     filterData.id = Number((<HTMLInputElement>evt.target).value);
// };

// export const filterByLanguage = (evt: Event): void => {
//     filterData.original_language = (<HTMLInputElement>evt.target).value;
// };

// const handFiltGenre = (movies: movie[], genresList) => {
//     const temporaryArr = [];
//     // Фильтер массива по жанрам
//     movies.forEach(movie => {
//         genresList.forEach(genre => {
//             if (movie.genres.includes(genre) && !temporaryArr.includes(movie)) {
//                 return temporaryArr.push(movie);
//             }
//         });
//     });

//     return temporaryArr;
// };

// const handleById = (movies: movie[], key: string, value: string): string[] => {
//     const temporaryArr = [];

//     movies.forEach(movie => {
//         if (value === movie[key]) {
//             return temporaryArr.push(movie);
//         }
//     });

//     return temporaryArr;
// };

// const handleByBudget = (movies): any => {
//     const temporaryArr = [];
//     movies.forEach(movie => {
//         if (movie.budget >= DOM.minBudget.dataset.value && movie.budget <= DOM.maxBudget.dataset.value) {
//             console.log(DOM.minBudget.dataset.value);
//             console.log(DOM.maxBudget.dataset.value);
//             temporaryArr.push(movie);
//         }
//     })

//     return temporaryArr;
// }

// const handleByData = (movies): any => {
//     const temporaryArr = [];
//     movies.forEach(movie => {
//         if (new Date(movie.release_date).getTime() >= new Date(DOM.minDate.value).getTime()
//             && new Date(movie.release_date).getTime() <= new Date(DOM.maxDate.value).getTime()) {
//             temporaryArr.push(movie);
//         }
//     })

//     return temporaryArr;
// }

// export const showFilms = () => {
//     const filtredByGenre = handFiltGenre(constants.movies, filterData.genre_ids);
//     const filterByBudget = handleByBudget(filtredByGenre.length ? filtredByGenre : constants.movies);

//     const filteredData = handleByData(filtredByGenre.length ? filterByBudget ?? filtredByGenre : constants.movies);
//     const filteredByLang = handleById(filtredByGenre.length ? filteredData ?? filtredByGenre ?? filterByBudget : constants.movies, 'original_language', filterData.original_language);
//     console.log('----------------------------------------------------------');
//     console.log(filteredByLang);
//     console.log('----------------------------------------------------------');

//     if (filtredByGenre.length) {
//         // constants.filteredFilms = [];
//         constants.filteredFilms = [...filtredByGenre];
//         console.log('+++')
//     }
//     if (filterByBudget.length) {
//         // constants.filteredFilms = [];
//         constants.filteredFilms = [...filterByBudget];
//         console.log('++++')
//     }
//     if (filteredData.length) {
//         constants.filteredFilms = [...filteredData];
//         console.log('+')
//     }
//     if (filteredByLang.length) {
//         // constants.filteredFilms = [];
//         constants.filteredFilms = [...filteredByLang];
//         console.log('++')
//     }


//     console.log(constants.filteredFilms.length);

//     creatFirstPage(constants.filteredFilms, 1);
//     DOM.filter.classList.toggle('hidden');
// };

export function openCloseFilters() {
    DOM.filter.classList.toggle('hidden');
}

export function changeColorGenres(evt: any) {
    clearFiltersGenres()
    if ((<HTMLElement>evt.target).className !== 'filmsGenres') {
        return;
    } else {
        evt.target.classList.toggle('filmGenresActiv');
    }
}

export function closeFilter(evt) {
    if (evt.target.className === 'filter') {
        openCloseFilters()
    }
}

export const resetFilter = (): void => {
    filterData.genre_ids = null;
    filterData.id = null;
    filterData.release_date = null;
    filterData.original_language = null;
    filterData.budget = null;
    filterData.adult = null;
    variable.skip = 0;
    constants.filteredFilms = [];
    (<HTMLInputElement>document.querySelector('.handle.left')).dataset.value = '0';
    (<HTMLInputElement>document.querySelector('.handle.right')).dataset.value = '300000000';
    //@ts-ignore
    (<HTMLInputElement>document.querySelector('.dual-range')).style = '--x-1:-9.34375px; --x-2:500px';
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