import { variable, URL } from './constans';
import { DOM } from './dom';
import { addMovie } from './showMovie';
export async function searchByTitle(): Promise<void> {
    variable.currentPage = 1;
    const query = URL.movies + `title=${DOM.searchInput.value}&`;
    URL.movies = query;
    variable.currentPage = 1;
    addMovie();
}
