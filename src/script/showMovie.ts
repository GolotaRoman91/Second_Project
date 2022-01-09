import { constants } from "./constans";
import { domElement } from "./constans";
import { variable } from "./constans";
import { movie } from "./types";
export async function addMovie() {
    await fetch(constants.requestURLMovie)
        .then(response => response.json())
        .then((data) => data.forEach((obj) => constants.movies.push(obj)))
        .then(() => creatFirstPage(constants.movies, variable.skip))
        .then(() => variable.numbersPage = Math.ceil(constants.movies.length / constants.movieOnPage))
        .catch(error => console.log(error))
}
export function creatFirstPage(movies: movie[], skip: number): void {
    console.log(movies)
    domElement.movieContainer.innerHTML = "";
    variable.currentPage = Math.ceil(movies.length / 5);

    if ((<movie[]>movies).length && !skip) {
        movies.forEach((item, index) => {
            if (index < 5) {
                const imageSrc = `${constants.URLIMG}${item.backdrop_path}`
                variable.htmlElems.push(constants.URLIMG + movies[index]?.backdrop_path);
                domElement.movieContainer.innerHTML += createPost(item, imageSrc);
            }
        })
    } else if (skip) {
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
                ${film.title}
                ${film.popularity}
                ${film.tagline}
            </div>
         </div>
    `
}
domElement.BtnLeft.addEventListener('click', () => scrollLeft(constants.filteredFilms.length ? constants.filteredFilms : constants.movies));
function scrollLeft(movies: movie[]): void {
    if (movies.length >= 5 && variable.skip !== 0) {
        variable.skip = variable.skip - 5
    } else if (variable.skip === 0) {
        return;
    }
    else {
        variable.skip = movies.length
    }
    creatFirstPage(movies, variable.skip)
}
domElement.BtnRight.addEventListener('click', () => scrollRight(constants.filteredFilms.length ? constants.filteredFilms : constants.movies));
function scrollRight(movies: movie[]): void {
    if (movies.length >= 5 && variable.skip !== movies.length) {
        variable.skip = variable.skip + 5
    } else {
        variable.skip = movies.length
    }

    if (variable.skip !== movies.length) {
        creatFirstPage(movies, variable.skip)
    }
}
domElement.movieContainer.onclick = function (event: MouseEvent) {
    const target = event.target;
    if ((<HTMLElement>target).className === "cartFilms") {
        return
    } else {
        const currentFilmId = (<HTMLElement>target).parentElement.id
        console.log(currentFilmId)
        window.open(`./moviePage.html#${currentFilmId}`)
    }
}