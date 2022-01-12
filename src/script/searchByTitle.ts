import { constants } from './constans';
import { variable } from './constans'
import { DOM } from './dom'
import { creatFirstPage } from './showMovie'
const axios = require('axios')


export async function searchByTitle() {
    variable.skip = 0;
    const result = await axios.get(`http://127.0.0.1:3001/movies?title=${DOM.searchInput.value}`)
    constants.filteredFilms = result.data
    creatFirstPage(constants.filteredFilms, 0)
}
