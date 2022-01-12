export const DOM = {
    wrapperIn: document.querySelector('.wrapper_In') as HTMLLIElement,
    wrapperUp: document.querySelector('.wrapper_Up') as HTMLLIElement,
    toSignIn: document.querySelector('.sign_in') as HTMLLIElement,
    toSignUp: document.querySelector('.sign_up') as HTMLLIElement,
    username: document.querySelector('.username') as HTMLInputElement,
    userpass: document.querySelector('.userpass') as HTMLInputElement,
    login: document.querySelector('.login') as HTMLInputElement,
    password: document.querySelector('.password') as HTMLInputElement,
    firstname: document.querySelector('.firstname') as HTMLInputElement,
    surname: document.querySelector('.surname') as HTMLInputElement,
    outputUp: document.querySelector('.outputUp') as HTMLLIElement,
    outputIn: document.querySelector('.outputIn') as HTMLLIElement,
    signUpButt: document.querySelector('.signUpButt') as HTMLButtonElement,
    signInButt: document.querySelector('.signInButt') as HTMLButtonElement,
    requestURl: 'http://127.0.0.1:3001/sign_up',
    requestURlsignIn: 'http://127.0.0.1:3001/sign_in',
    wrapIn: document.querySelector('.wrapIn') as HTMLLIElement,
    wrapUp: document.querySelector('.wrapUp') as HTMLLIElement,
    registr: document.querySelector('.registr') as HTMLLIElement,
    filmsArea: document.querySelector('.filmsArea') as HTMLLIElement,
    wrapRegistr: document.querySelector('.wrapRegistr') as HTMLLIElement,
    navigationRight: document.querySelector('.navigationRight') as HTMLLIElement,
    filterBtn: document.querySelector('.btnFilterFilms') as HTMLButtonElement,
    filter: document.querySelector('.filter') as HTMLLIElement,
    genres: document.querySelector('.genres') as HTMLLIElement,
    originalTitle: document.querySelector('.film_original_name'),
    date: document.querySelector('.film_date'),
    filmGenres: document.querySelector('.film_genres'),
    // rate: document.querySelector('.film_rate'),
    filmRevenue: document.querySelector('.film_revenue'),
    filmAdult: document.querySelector('.film_adult'),
    filmPopularity: document.querySelector('.film_popularity'),
    language: document.querySelector('.film_languages'),
    poster: document.querySelector('.poster') as HTMLImageElement,
    description: document.querySelector('.description'),
    title: document.querySelector('.film_name'),
    signOut: document.querySelector('.signOut'),
    loader: document.querySelector('.bodyLoader'),
    mainPageTitle: document.querySelector('.title'),
    trailer: document.querySelector('.trailer'),
    minBudget: document.querySelector('.left') as HTMLInputElement,
    maxBudget: document.querySelector('.right') as HTMLInputElement,
    minDate: document.querySelector('#startData') as HTMLInputElement,
    maxDate: document.querySelector('#endData') as HTMLInputElement,
    searchInput: document.querySelector('.searchInput') as HTMLInputElement,
    btnSearch: document.querySelector('.searchButton') as HTMLButtonElement,
    justWatch: document.querySelector('.justWatch') as HTMLElement,
    cartJustWatchFilm: document.querySelector('.cartJustWatchFilm') as HTMLElement,
    dualRange: document.querySelector('.dual-range') as HTMLElement,
    buttPos: document.querySelector('.buttPos') as HTMLElement,
    notFoundAlert: document.querySelector('.notFoundAlert') as HTMLElement
}