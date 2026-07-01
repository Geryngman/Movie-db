export interface Movie {
  id: number
  title: string
  tagline: string
  year: number
  runtime: number // minutes
  rating: number // 0 - 10
  genres: string[]
  overview: string
  director: string
  cast: string[]
  posterColor: [string, string] // gradient fallback for the poster
  posterPath?: string // TMDB image path, e.g. /abc.jpg
  backdropPath?: string
  trending?: boolean
  featured?: boolean
}

export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Thriller'
