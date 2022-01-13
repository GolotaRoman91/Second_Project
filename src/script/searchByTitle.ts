import { constants } from './constans';
import { variable } from './constans'
import { DOM } from './dom'
import { addMovie } from './showMovie'
const axios = require('axios')


export async function searchByTitle() {
    variable.currentPage = 1;
    const result = await axios.get(`http://127.0.0.1:3001/movies?title=${DOM.searchInput.value}&page=${variable.currentPage}`)
    // constants.filteredFilms = result.data
    searchByTitleRender(result)
}
function searchByTitleRender(result) {
    console.log(result)
    if (result.data === 'Not found') {
        DOM.searchInput.value = "";
        DOM.buttPos.classList.add('hidden')
        DOM.notFoundAlert.classList.remove('hidden')
    } else {
        DOM.searchInput.value = "";
        DOM.notFoundAlert.classList.add('hidden')
        DOM.buttPos.classList.remove('hidden')
        variable.skip = 0;
        addMovie()
    }
}