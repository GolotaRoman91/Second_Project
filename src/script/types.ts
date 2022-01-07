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
    genre_ids: number[],
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

export type genresType = {
    id: number,
    name: string
}