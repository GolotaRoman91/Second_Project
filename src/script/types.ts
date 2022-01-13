export type bodySignUp = {
    password: string,
    login: string,
    first_name: string,
    last_name: string
}

export type bodySignIn = {
    login: string,
    password: string
}

export type movie = {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genres: number[],
    homepage: string,
    id: number,
    imdb_id: string,
    movie_rate: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    title: string
}
export type movieResponse = {
    backdrop_path: string,
    original_title: string,
    original_language: string,
    release_date: string,
    movie_rate: string,
    adult: boolean,
    budget: string,
    popularity: string,
    overview: string,
    title: string,
    genres: string,
    trailer: string,
}

export type genresType = {
    id: number,
    name: string
}
export type language = {
    original_language: string
}