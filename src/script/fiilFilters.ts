import { DOM } from './dom';
import { genresType, language } from './types';
import { URL } from './constans';

const axios = require('axios');
export async function fillFiltersGenre(): Promise<void> {
    const genreArray = await axios.get(URL.genres + document.cookie);
    const languageArray = await axios.get(URL.language + document.cookie);
    createGenresBlock(genreArray.data);
    createlanguageBlock(languageArray.data);
}
function createGenresBlock(genreArray: genresType[]): void {
    genreArray.forEach(genre => {
        DOM.genres.innerHTML += `<li data-f="Action" id="${genre.id}" class="filmsGenres" data-value="1">${genre.name}</li>`;
    });
}
function createlanguageBlock(languageArray: language[]): void {
    languageArray.forEach(language => {
        DOM.selectLanguage.innerHTML += `<option class="language">${language.original_language}</option>`;
    });
}
