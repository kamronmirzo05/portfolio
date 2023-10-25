export interface Data {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [];
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    name?: string
}


export interface DetailsData {
    backdrop_path: string,
    belongs_to_collection?: {
        backdrop_path: string,
        id: number,
        name: string,
        poster_path: string
    },
    budget?: number,
    genres?: genres[],
    homepage?: string,
    id?: number,
    imdb_id?: number,
    original_language?: string,
    original_title?: string,
    overview?: string,
    popularity?: number,
    poster_path?: string,
    production_companies?: production_companies[],
    production_countries?: production_countries[],
    release_date?: string,
    revenue?: number,
    runtime?: number,
    spoken_languages?: {
        [index: string]: { iso_639_1: string, english_name: string, name: string }
    },
    status?: string,
    tagline?: string,
    title?: string,
    video?: boolean,
    vote_average?: number,
    vote_count?: number
}

interface genres {
    id:number,
    name:string
}

interface production_companies {
    id: number, name: string, logo_path: string, origin_country: string
}
interface production_countries {
    name: string,
    iso_3166_1: string
}