const constants = {
    URLIMG: 'https://image.tmdb.org/t/p/original',
    requestURLMovie: 'https://wowmeup.pp.ua/movie?_limit=100',
    movies: [],
    movieOnPage: 5,
    filteredFilms: [],
    adultFilms: [],
    budgetFilms: [],
    filmByLang: []
};

 const domElement = {
     BtnLeft: document.querySelector('.btnRight'),
     BtnRight: document.querySelector('.btnLeft'),
     movieContainer: document.querySelector('.cartFilms'),
     movieElement: document.createElement('img'),
     movieElements: document.querySelectorAll('.cartFilm'),
     films: document.querySelectorAll('.films'),
     nav: document.getElementById('nav-block'),
     adult: document.querySelector('.adult'),
     btnFilter: document.querySelector('.btnFilter'),
     minNumberBudget: document.querySelector('.minNumberBudget'),
     maxNumberBudget: document.querySelector('.maxNumberBudget'),
     filmId: document.getElementById('filmId'),
     selectLanguage: document.getElementById('selectLanguage'),
     containerFilter: document.querySelector('.containerFilter'),
     btnFilterFilms: document.querySelector('.btnFilterFilms'),
     btnResetSettings: document.querySelector('.btnResetSettings'),
};

let variable = {
    htmlElems: [],
    currentPage: 1,
    numbersPage: 0,
    variable: 0,
    minBudget: 0,
    maxBudget: 0,
    skip: 0,
    limit: 5
};

let filterData = {
    genre_ids: [],
    id: null,
    release_date: null,
    original_language: null,
    budget: null,
    adult: null,
}
