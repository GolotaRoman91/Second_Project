import { variable, requestURLMovie } from './constans'
import { DOM } from './dom'
import { addMovie } from './showMovie'
export async function searchByTitle() {
    variable.currentPage = 1;
    const query = `http://127.0.0.1:3001/movies?title=${DOM.searchInput.value}&`
    requestURLMovie.url = query
    variable.currentPage = 1
    addMovie()
}