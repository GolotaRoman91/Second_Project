import { DOM } from './dom';
import { constants, URL, filterData, variable } from './constans';
import { addMovie } from './showMovie';
export async function getFiltredFilms() {
    let query = URL.movies;
    if (DOM.selectLanguage.value !== 'All') {
        query += `languages=${DOM.selectLanguage.value}&`;
    }
    if (filterData.genre_ids !== null) {
        query += `genre_id=${filterData.genre_ids}&`;
    }
    if (DOM.minBudget.dataset.value) {
        query += `budget_min=${DOM.minBudget.dataset.value}&`;
    }
    if (DOM.startData.value && DOM.endData.value) {
        query += `minDate=${DOM.startData.value}&maxDate=${DOM.endData.value}&`;
    }
    if (DOM.maxBudget.dataset.value) {
        query += `budget_max=${DOM.maxBudget.dataset.value}&`;
    }
    URL.movies = query;
    variable.currentPage = 1;
    (<HTMLInputElement>DOM.BtnLeft).classList.add('hiddenArrow');
    addMovie();
    DOM.notFoundAlert.classList.add('hidden');
    DOM.buttPos.classList.remove('hidden');
    DOM.filter.classList.toggle('hidden');
}
export const showFilters = (): void => {
    DOM.containerFilter.style.display = 'block';
};
export const getFilms = (event: Event): void => {
    if ((<HTMLElement>event.target).tagName !== 'LI') {
        return;
    } else {
        filterData.genre_ids = (<HTMLElement>event.target).id;
    }
};
export function openCloseFilters() {
    DOM.filter.classList.toggle('hidden');
}
export function changeColorGenres(evt: MouseEvent) {
    const target = evt.target as HTMLButtonElement;
    clearFiltersGenres();
    if ((<HTMLElement>evt.target).className !== 'filmsGenres') {
        return;
    } else {
        target.classList.toggle('filmGenresActiv');
    }
}
export function closeFilter(evt: Event): void {
    if ((<HTMLElement>evt.target).className === 'filter') {
        openCloseFilters();
    }
}
export function hideArrow(arrow: HTMLElement): void {
    arrow.classList.add('hiddenArrow');
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (<HTMLInputElement>document.querySelector('.dual-range')).style = '--x-1:-9.34375px; --x-2:500px';
    clearFiltersGenres();
    (<HTMLInputElement>document.querySelector('#selectLanguage')).value = 'All';
    DOM.minCalendarData.value =  DOM.minCalendarData.min;
    DOM.maxCalendarData.value =  new Date().toLocaleDateString('sv-se');
};
function clearFiltersGenres() {
    const genresList = Array.from(document.querySelectorAll('.filmsGenres'));
    genresList.forEach(element => {
        element.classList.remove('filmGenresActiv');
    });
}
