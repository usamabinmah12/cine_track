export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card bg-base-100 shadow-xl animate-pulse border border-base-200">
          <div className="h-64 bg-base-300 rounded-t-2xl"></div>
          <div className="card-body p-4 space-y-3">
            <div className="h-6 bg-base-300 rounded w-3/4"></div>
            <div className="h-4 bg-base-300 rounded w-1/2"></div>
            <div className="h-4 bg-base-300 rounded w-1/4"></div>
            <div className="card-actions justify-end pt-4">
              <div className="h-10 bg-base-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
