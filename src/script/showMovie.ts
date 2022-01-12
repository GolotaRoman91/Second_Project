import { constants } from "./constans";
import { domElement } from "./constans";
import { variable } from "./constans";
import { movie } from "./types";
import { hideArrow } from "./filters";
export async function addMovie() {
    await fetch(constants.requestURLMovie)
        .then(response => response.json())
        .then((data) => data.forEach((obj) => constants.movies.push(obj)))
        .then(() => creatFirstPage(constants.movies, variable.skip))
        .then(() => variable.numbersPage = Math.ceil(constants.movies.length / constants.movieOnPage))
        .catch(error => console.log(error))
}

export function creatFirstPage(movies: movie[], skip: number): void {
    domElement.movieContainer.innerHTML = "";
    variable.currentPage = Math.ceil(movies.length / 5);
    
    if ((<movie[]>movies).length && !skip) {
        hideArrow(domElement.BtnLeft);
        (<HTMLInputElement>domElement.BtnRight).classList.remove('hiddenArrow');
        movies.forEach((item, index) => {
            if (index < 5) {
                const imageSrc = `${constants.URLIMG}${item.backdrop_path}`
                variable.htmlElems.push(constants.URLIMG + movies[index]?.backdrop_path);
                domElement.movieContainer.innerHTML += createPost(item, imageSrc);
            }
        })
    } else if (skip) {
        (<HTMLInputElement>domElement.BtnLeft).classList.remove('hiddenArrow');     
        const skipArr = movies.slice(skip, skip + 5)
        skipArr.forEach(elem => {
            const imageSrc = `${constants.URLIMG}${elem.backdrop_path}`
            variable.htmlElems.push(constants.URLIMG + elem?.backdrop_path);
            domElement.movieContainer.innerHTML += createPost(elem, imageSrc);
        });
    }
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
    `
}

export function scrollLeft(movies: movie[]): void {
    if (variable.skip === 0) {
        hideArrow(document.querySelector('.btnRight'));
        console.log(variable.skip)
        return
    }
    else if (movies.length >= 5 && variable.skip !== 0) {
        variable.skip = variable.skip - 5
    }
    if (variable.skip !== movies.length) {
        creatFirstPage(movies, variable.skip)
    }
    if (variable.skip + 5 < movies.length) {
        (<HTMLInputElement>domElement.BtnRight).classList.remove('hiddenArrow');
    }
}

export function scrollRight(movies: movie[]): void {

    if (variable.skip >= movies.length - 5) {
        console.log(variable.skip)
        return
    }
    else if (movies.length >= 5 && variable.skip !== movies.length) {
        variable.skip = variable.skip + 5
        console.log(variable.skip)
    }
    if (variable.skip !== movies.length) {
        console.log(variable.skip)
        creatFirstPage(movies, variable.skip)
    }
    if (variable.skip + 5 >= movies.length) {
        hideArrow(domElement.BtnRight)
    }
}

export function getCurrentFilmId(event: MouseEvent) {
    const target = event.target;
    if ((<HTMLElement>target).className === "poster" || (<HTMLElement>target).className === "descriptionWrapper") {
        const currentFilmId = (<HTMLElement>target).parentElement.id
        openMainPage(currentFilmId)
    } else {
        return
    }
}
export function openMainPage(currentFilmId) {
    window.open(`./moviePage.html#${currentFilmId}`)
}