import { constants, variable, URL } from './constans';
import { movie } from './types';
import { DOM } from './dom';
const axios = require('axios');
export async function addMovie(): Promise<void> {
    constants.movies = [];
    const movieArrayResult = await axios.get(URL.movies + 'page=' + variable.currentPage + '&' + document.cookie);
    if (movieArrayResult.data === 'Not found') {
        notFound();
        return;
    } else {
        DOM.player404.pause();
        DOM.player404.currentTime = 0;
        render(movieArrayResult.data);
    }
}
function notFound(): void {
    DOM.searchInput.value = '';
    DOM.buttPos.classList.add('hidden');
    DOM.notFoundAlert.classList.remove('hidden');
    DOM.player404.play();
}
function render(movieArrayResult): void {
    if (movieArrayResult.totalCount.count <= 5 || Math.ceil(movieArrayResult.totalCount.count / 5) <= variable.currentPage) {
        DOM.BtnRight.classList.add('hiddenArrow');
    } else if (movieArrayResult.totalCount.count > 5) {
        DOM.BtnRight.classList.remove('hiddenArrow');
    }
    DOM.searchInput.value = '';
    DOM.notFoundAlert.classList.add('hidden');
    DOM.buttPos.classList.remove('hidden');
    movieArrayResult.movies.forEach(obj => constants.movies.push(obj));
    variable.totalCount = movieArrayResult.totalCount.count;
    creatFirstPage(constants.movies);
}

export function creatFirstPage(movies: movie[]): void {
    DOM.movieContainer.innerHTML = '';
    movies.forEach((item, index) => {
        const imageSrc = `${URL.image}${item.backdrop_path}`;
        variable.htmlElems.push(URL.image + movies[index]?.backdrop_path);
        DOM.movieContainer.innerHTML += createPost(item, imageSrc);
    });
}
function createPost(film: movie, imageSrc: string) {
    return `
         <div class="cartFilm slider__item" id="${film.id}">
            <img src=${imageSrc} class="poster">
            <div class="descriptionWrapper">
                <span class="cartFilmTitle">${film.title}</span>
                ${film.tagline}
            </div>
         </div>
    `;
}
export function scrollLeft(): void {
    if (variable.currentPage == 1) {
        return;
    } else {
        variable.currentPage--;
        DOM.BtnRight.classList.remove('hiddenArrow');
        if (variable.currentPage == 1) {
            DOM.BtnLeft.classList.add('hiddenArrow');
        }
        addMovie();
    }
}

export function scrollRight(): void {
    if (variable.currentPage * 5 >= variable.totalCount) {
        (<HTMLInputElement>DOM.BtnRight).classList.add('hiddenArrow');
        return;
    } else {
        variable.currentPage++;
        if (variable.currentPage * 5 > variable.totalCount) {
            DOM.BtnRight.classList.add('hiddenArrow');
        }
        DOM.BtnLeft.classList.remove('hiddenArrow');
        addMovie();
    }
}
export function getCurrentFilmId(event: MouseEvent): void {
    const target = event.target;
    if ((<HTMLElement>target).className === 'poster' || (<HTMLElement>target).className === 'descriptionWrapper') {
        const currentFilmId = (<HTMLElement>target).parentElement.id;
        openMainPage(currentFilmId);
    } else {
        return;
    }
}
export function openMainPage(currentFilmId: string): void {
    window.open(`./moviePage.html#${currentFilmId}`);
}
