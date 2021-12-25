import { constants } from "./constans";
import { domElement } from "./constans";
import { variable } from "./constans";
export async function addMovie() {
    await fetch(constants.requestURLMovie)
        .then(response => response.json())
        .then((data) => data.movies.forEach((obj) => constants.movies.push(obj)))
        .then(() => creatFirstPage(constants.movies, variable.skip))
        .then(() => variable.numbersPage = Math.ceil(constants.movies.length / constants.movieOnPage))
        .catch(error => console.log(error))
}
// addMovie()

export function creatFirstPage(movies, skip) {
    console.log('here')
    domElement.movieContainer.innerHTML = "";
    variable.currentPage = Math.ceil(movies.length / 5);

    if (movies.length && !skip) {
        console.log('movies: ', movies)
        movies.forEach((item, index) => {
            if (index < 5) {
                const imageSrc = `${constants.URLIMG}${item.backdrop_path}`
                console.log('imageSrc: ', imageSrc)
                variable.htmlElems.push(constants.URLIMG + movies[index]?.backdrop_path);
                domElement.movieContainer.innerHTML += createPost(item, imageSrc);
            }
        })
    } else if (skip) {
        const skipArr = movies.slice(skip, skip + 5)
        skipArr.forEach(elem => {
            const imageSrc = `${constants.URLIMG}${elem.backdrop_path}`
            console.log('imageSrc: ', imageSrc)
            variable.htmlElems.push(constants.URLIMG + elem?.backdrop_path);
            domElement.movieContainer.innerHTML += createPost(elem, imageSrc);
        });
    }
}


function createPost(film, imageSrc) {
    return `
         <div class="cartFilm" id="${film.id}">
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
function scrollLeft(movies) {
    if (movies.length >= 5 && variable.skip !== 0) {
        variable.skip = variable.skip - 5
    } else if (variable.skip === 0) {
        return;
    }
    else {
        variable.skip = movies.length
    }
    console.log('variable.skip: ', variable.skip)
    creatFirstPage(movies, variable.skip)
}
domElement.BtnRight.addEventListener('click', () => scrollRight(constants.filteredFilms.length ? constants.filteredFilms : constants.movies));
function scrollRight(movies) {
    if (movies.length >= 5 && variable.skip !== movies.length) {
        variable.skip = variable.skip + 5
    } else {
        variable.skip = movies.length
    }

    if (variable.skip !== movies.length) {
        creatFirstPage(movies, variable.skip)
    }
    console.log('variable.skip: ', variable.skip)
}

domElement.movieContainer.onclick = function (event) {
    let target = event.target;
    const currentFilmId = (<HTMLElement>target).parentElement.id
    window.open("./moviePage.html")
    console.log(currentFilmId)
}