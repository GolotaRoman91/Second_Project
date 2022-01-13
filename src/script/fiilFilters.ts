import { DOM } from './dom';
import { genresType, language } from './types'
const axios = require('axios')
export async function fillFiltersGenre(): Promise<void> {
    const genreArray = await axios.get(`http://127.0.0.1:3001/genres?` + document.cookie)
    const languageArray = await axios.get(`http://127.0.0.1:3001/languages?` + document.cookie)
    createGenresBlock(genreArray.data)
    createlanguageBlock(languageArray.data)
}
function createGenresBlock(genreArray: genresType[]): void {
    genreArray.forEach(genre => {
        DOM.genres.innerHTML += `<li data-f="Action" id="${genre.id}" class="filmsGenres" data-value="1">${genre.name}</li>`
    });
}
function createlanguageBlock(languageArray: language[]): void {
    console.log(languageArray)
    languageArray.forEach(language => {
        DOM.selectLanguage.innerHTML += `<option class="language">${language.original_language}</option>`
    });
}