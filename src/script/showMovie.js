async function addMovie() {
    await fetch(constants.requestURLMovie)
        .then(response => response.json())
        .then((data)  => data.movies.forEach((obj) => constants.movies.push(obj)))
        .then(() => creatFirstPage(constants.movies))
        .then(() => variable.numbersPage =  Math.ceil(constants.movies.length / constants.movieOnPage))
        .catch(error => console.log(error))
}
addMovie()

function creatFirstPage(movies, skip) {
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
                // document.querySelector('.descriptionWrapper').addEventListener('mouseover', () => {
                //     document.querySelector('.descriptionWrapper').className = 'descriptionWrapperShow';
                //     document.querySelector('.descriptionWrapperShow').addEventListener('mouseout', () => {
                //         document.querySelector('.descriptionWrapperShow').className = 'descriptionWrapper';
                //     })
                // })

                // document.querySelectorAll('.descriptionWrapper').forEach(item => item.addEventListener('mouseover', (evt) => {
                //     evt.target.className = 'descriptionWrapperShow';
                //         evt.target.addEventListener('mouseout', (event) => {
                //         event.target.className = 'descriptionWrapper';
                //     })
                // }))
            }
        })
    } else if (skip) {
        for (let i = skip; i < (skip + 5); i++) {
            const imageSrc = `${constants.URLIMG}${movies[i].backdrop_path}`
            console.log('imageSrc: ', imageSrc)
            variable.htmlElems.push(constants.URLIMG + movies[i]?.backdrop_path);
            domElement.movieContainer.innerHTML += createPost(movies[i], imageSrc);
            // document.querySelectorAll('.descriptionWrapper').forEach(item => item.addEventListener('mouseover', (evt) => {
            //     evt.target.className = 'descriptionWrapperShow';
            //     evt.target.addEventListener('mouseout', (event) => {
            //         event.target.className = 'descriptionWrapper';
            //     })
            // }))
        }
    }



    // if (!movies.length) {
    //     return;
    // }
    // variable.htmlElems = [];
    //
    // domElement.movieContainer = "";
    //
    //
    //
    // }
    // for (let i = 0; i < constants.movieOnPage; i++) {
    //     // console.log(constants.movies[i])
    //     // variable.htmlElems.push(constants.URLIMG + movies[i]?.backdrop_path);
    //     domElement.movieElements[i].innerHTML = ''
    // }
    //
    // for (let i = 0; i < constants.movieOnPage; i++) {
    //     // console.log(constants.movies[i])
    //     variable.htmlElems.push(constants.URLIMG + movies[i]?.backdrop_path);
    //     domElement.movieElements[i].innerHTML = `<img src=${variable.htmlElems[i]} class="poster">`

}

// function creatFirstPage() {
//     console.log('constants.movies: ', constants.movies)
//     console.log('constants.filteredFilms: ', constants.filteredFilms)
//     if (!constants.movies) {
//         return;
//     }
//     for (let i = 0; i < constants.movieOnPage; i++) {
//         // console.log(constants.movies[i])
//         variable.htmlElems.push(constants.URLIMG + constants.movies[i].backdrop_path);
//         domElement.movieElements[i].innerHTML = `<img src=${variable.htmlElems[i]} class="poster">`
//     }
// }


// my///////////////////////////////////////////////

function  createPost(film, imageSrc){
    
    return`
         <div class="cartFilm">
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
    // if (variable.currentPage === variable.numbersPage) {
    //     return;
    // }
    // variable.currentPage += 1;
    // let start = (variable.currentPage-1) * constants.movieOnPage;
    // let end = start + constants.movieOnPage;
    //     variable.htmlElems = constants.movies.slice(start, end).map(item => constants.URLIMG + item.backdrop_path)
    // for (let i = 0; i < constants.movieOnPage; i++) {
    //     domElement.movieElements[i].innerHTML = `<img src = ${variable.htmlElems[i]} class="poster">`
    // }
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

    // debugger
    // if (variable.currentPage === 1) {
    //     return;
    // }
    // variable.currentPage -= 1;
    // let start = (variable.currentPage-1) * constants.movieOnPage;
    // let end = start + constants.movieOnPage;
    //     variable.htmlElems = constants.movies.slice(start, end).map(item => constants.URLIMG + item.backdrop_path)
    // for (let i = 0; i < constants.movieOnPage; i++) {
    //     domElement.movieElements[i].innerHTML = `<img src = ${variable.htmlElems[i]} class="poster">`
    // }
}
