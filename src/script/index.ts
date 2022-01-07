import '../styles/style.css'
import '../styles/footer.css'
import '../styles/filter.css'
import '../styles/cartfilms.css'
import "core-js/stable";
import "regenerator-runtime/runtime";
import { DOM } from './dom';
import { domElement } from './constans'; 
import { signIn, modal, toSignIn, toSignUp, signOut } from './autorization';
import { addMovie } from './showMovie';
import { resetFilter, openCloseFilters, changeColorGenres, filterByLanguage, filterByiD, getFilms, showFilters, showFilms } from './filters'

const arrowLeft = require('../image/arrow_left.png');
const arrowRight = require('../image/arrow_right.png');
const background = require('../image/bg.jpg');

addMovie()
DOM.signInButt.addEventListener('click', signIn);
DOM.signUpButt.addEventListener('click', modal);
DOM.toSignIn.addEventListener('click', toSignIn);
DOM.toSignUp.addEventListener('click', toSignUp);
DOM.navigationRight.addEventListener('click', signOut);
domElement.btnResetSettings.addEventListener('click', resetFilter);
DOM.filterBtn.addEventListener('click', openCloseFilters);
DOM.genres.addEventListener('click', changeColorGenres);
domElement.selectLanguage.addEventListener('change', filterByLanguage);
domElement.filmId.addEventListener('change', filterByiD);
domElement.nav.addEventListener('click', getFilms);
domElement.btnFilterFilms.addEventListener('click', showFilters);
domElement.btnFilter.addEventListener('click', showFilms);
