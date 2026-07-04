export default function Toolbar({ searchTerm, setSearchTerm, filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-base-100 p-4 rounded-xl shadow-sm border border-base-200 mb-8">
      <div className="form-control w-full md:max-w-xs">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies by title..."
            className="input input-bordered w-full pr-10 focus:input-primary input-sm sm:input-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-base-content/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center justify-end">
        {/* Status Tabs Filter */}
        <div className="join w-full sm:w-auto justify-center">
          {['All', 'Watched', 'Unwatched'].map((status) => (
            <button
              key={status}
              className={`join-item btn btn-sm flex-1 sm:flex-none capitalize ${
                filter === status ? 'btn-primary' : 'btn-ghost bg-base-200'
              }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Sort Select Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <span className="text-xs font-semibold text-base-content/60 hidden sm:inline whitespace-nowrap">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm focus:select-primary w-full sm:w-40 font-medium"
          >
            <option value="newest">Newest Added</option>
            <option value="rating">Highest Rated</option>
            <option value="year-desc">Year (Newest)</option>
            <option value="year-asc">Year (Oldest)</option>
            <option value="title-asc">Title (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

