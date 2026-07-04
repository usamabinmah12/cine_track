import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialMovies } from './data/initialMovies';
import MovieForm from './components/MovieForm';
import MovieCard from './components/MovieCard';
import Toolbar from './components/Toolbar';
import SkeletonGrid from './components/SkeletonGrid';
import EmptyState from './components/EmptyState';
import logo from './assets/logo.png';
import Footer from './components/Footer';

export default function App() {
  const [movies, setMovies] = useLocalStorage('cinetrack_movies', initialMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state on initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAddMovie = (newMovieData) => {
    const newMovie = {
      ...newMovieData,
      id: crypto.randomUUID(),
      watched: false,
      createdAt: new Date().toISOString()
    };
    setMovies((prev) => [newMovie, ...prev]);
  };

  const handleToggleWatched = (id) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const handleDeleteMovie = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const handleUpdateMovie = (id, updatedFields) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, ...updatedFields } : movie
      )
    );
  };

  // Processing search, filter & sort logic
  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (filter === 'Watched') return matchesSearch && movie.watched;
      if (filter === 'Unwatched') return matchesSearch && !movie.watched;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'year-desc') {
        return b.releaseYear - a.releaseYear;
      }
      if (sortBy === 'year-asc') {
        return a.releaseYear - b.releaseYear;
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      // default is 'newest' (createdAt newest first)
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-200 container mx-auto">
      {/* Header Banner */}
      <header className="navbar bg-neutral text-neutral-content shadow-lg px-4 md:px-8 py-3 mb-6 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 flex justify-between items-center">
  <div className="flex items-center gap-3">
    {/* Clean, perfectly-scaled Brand Logo */}
    <div className="w-10 h-10 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-100 flex items-center justify-center p-1 shadow-md">
      <img 
        src={logo} 
        alt="CineTrack Logo" 
        className="w-full h-full object-contain"
      />
    </div>
    
    {/* Brand Title */}
    <div className="flex flex-col justify-center">
      <h1 className="text-xl md:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent leading-none">
        CineTrack
      </h1>
      <span className="text-[10px] uppercase tracking-widest text-neutral-content/50 font-bold mt-1 hidden sm:inline">
        Your Personal Cinema Hub
      </span>
    </div>
  </div>

  {/* Interactive/Data actions on the right side */}
  <div className="flex-none gap-2">
    <div className="badge badge-primary gap-2 p-4 font-mono font-bold text-xs md:text-sm shadow-inner">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h18M3 16h18"></path>
      </svg>
      <span>Total Tracked:</span>
      <div className="badge badge-neutral badge-sm md:badge-md text-neutral-content">
        {movies.length}
      </div>
    </div>
  </div>
</header>

      {/* Main Framework Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <MovieForm onAddMovie={handleAddMovie} />
        
        <Toolbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          filter={filter} 
          setFilter={setFilter} 
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {isLoading ? (
          <SkeletonGrid />
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleWatched={handleToggleWatched}
                onDeleteMovie={handleDeleteMovie}
                onUpdateMovie={handleUpdateMovie}
              />
            ))}
          </div>
        ) : (
          <EmptyState hasFilters={searchTerm.trim() !== '' || filter !== 'All'} />
        )}
      </main>
      <Footer moviesCount={movies.length}></Footer>
    </div>
  );
}
