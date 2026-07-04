export const validateMovie = (movie) => {
  const errors = {};
  const currentYear = new Date().getFullYear();

  if (!movie.title.trim()) errors.title = 'Title is required';
  if (!movie.genre.trim()) errors.genre = 'Genre is required';
  
  if (!movie.releaseYear) {
    errors.releaseYear = 'Release year is required';
  } else if (movie.releaseYear < 1888 || movie.releaseYear > currentYear + 5) {
    errors.releaseYear = `Enter a valid year between 1888 and ${currentYear + 5}`;
  }

  if (movie.posterUrl && !movie.posterUrl.match(/^https?:\/\/.+/)) {
    errors.posterUrl = 'Must be a valid URL starting with http:// or https://';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&q=80';
