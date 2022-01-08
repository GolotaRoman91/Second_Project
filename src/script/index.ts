import '../styles/loader.css'
import '../styles/style.css'
import '../styles/footer.css'
import '../styles/filter.css'
import '../styles/cartfilms.css'
import '../styles/header.css'
import "core-js/stable";
import "regenerator-runtime/runtime";
import { DOM } from './dom';
import { domElement } from './constans';
import { loader } from './loader';
import { signIn, modal, toSignIn, toSignUp, signOut } from './autorization';
import { addMovie } from './showMovie';
import { resetFilter, openCloseFilters, changeColorGenres, filterByLanguage, filterByiD, getFilms, showFilters, showFilms, closeFilter } from './filters';

require('../image/arrow_left.png');
require('../image/arrow_right.png');
require('../image/bg.jpg');
require('../image/Logo.png');
require('../image/favicon.png');

window.addEventListener('load', loader);
addMovie();
DOM.signInButt.addEventListener('click', signIn);
DOM.signUpButt.addEventListener('click', modal);
DOM.toSignIn.addEventListener('click', toSignIn);
DOM.toSignUp.addEventListener('click', toSignUp);
DOM.signOut.addEventListener('click', signOut);
domElement.btnResetSettings.addEventListener('click', resetFilter);
DOM.filterBtn.addEventListener('click', openCloseFilters);
DOM.genres.addEventListener('click', changeColorGenres);
domElement.selectLanguage.addEventListener('change', filterByLanguage);
domElement.filmId.addEventListener('change', filterByiD);
domElement.nav.addEventListener('click', getFilms);
domElement.btnFilterFilms.addEventListener('click', showFilters);
domElement.btnFilterFilms.addEventListener('click', resetFilter);
domElement.btnFilter.addEventListener('click', showFilms);
DOM.filter.addEventListener('click', closeFilter)