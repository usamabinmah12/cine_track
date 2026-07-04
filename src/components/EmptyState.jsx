export default function EmptyState({ hasFilters }) {
  return (
    <div className="text-center py-16 px-4 bg-base-200 rounded-2xl border border-dashed border-base-300 max-w-md mx-auto mt-8">
      <svg className="mx-auto h-16 w-16 text-base-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
      </svg>
      <h3 className="text-xl font-bold text-base-content mb-1">
        {hasFilters ? 'No matches found' : 'Your watchlist is empty'}
      </h3>
      <p className="text-sm text-base-content/60">
        {hasFilters 
          ? 'Try tweaking your search or filter options to find what you are looking for.' 
          : 'Start building your library by adding your favorite movies above!'}
      </p>
    </div>
  );
}