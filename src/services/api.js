import movies from '../data/movies'

export const getMovies = () => movies

export const getMovieById = (id) =>
  movies.find((movie) => String(movie.id) === String(id)) || null

export const searchMovies = (query = '') => {
  const normalized = query.trim().toLowerCase()

  if (!normalized) return movies

  return movies.filter((movie) => {
    const haystack = [
      movie.title,
      movie.description,
      movie.director,
      movie.language,
      ...(movie.cast || []),
      ...(movie.genres || []),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalized)
  })
}

export const getTrendingMovies = () =>
  [...movies].sort((a, b) => b.rating - a.rating).slice(0, 8)

export const getPopularMovies = () =>
  [...movies].sort((a, b) => b.year - a.year).slice(0, 8)

export const getMoviesByGenre = (genre) =>
  movies.filter((movie) => movie.genres.includes(genre))

export const getFeaturedMovie = () => movies[0]
