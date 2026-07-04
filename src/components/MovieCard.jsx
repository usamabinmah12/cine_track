import { useState } from 'react';
import { FALLBACK_POSTER } from '../utils/validators';
import { toast } from 'react-toastify';

export default function MovieCard({ movie, onToggleWatched, onDeleteMovie, onUpdateMovie }) {
  const { id, title, genre, releaseYear, posterUrl, watched, rating = 0, review = '' } = movie;
  const [isEditing, setIsEditing] = useState(false);
  const [localReview, setLocalReview] = useState(review);

  const handleRatingChange = (newRating) => {
    toast("Your Rating Added")
    onUpdateMovie(id, { rating: newRating });
  };

  const handleSaveReview = () => {
    toast("Your Review Added")
    onUpdateMovie(id, { review: localReview });
    setIsEditing(false);
  };

  return (
    <div className={`card card-compact bg-base-100 shadow-md transition-all duration-300 border ${
      watched ? 'border-success/30 opacity-95' : 'border-base-200 hover:shadow-lg'
    }`}>
      <figure className="relative h-60 overflow-hidden bg-base-300">
        <img
          src={posterUrl?.trim() ? posterUrl : FALLBACK_POSTER}
          alt={`${title} Poster`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => { e.target.src = FALLBACK_POSTER; }}
        />
        <span className={`absolute top-3 right-3 badge font-semibold p-3 shadow-md ${
          watched ? 'badge-success text-success-content' : 'badge-neutral'
        }`}>
          {watched ? 'Watched' : 'Unwatched'}
        </span>
      </figure>

      <div className="card-body p-4 justify-between">
        <div>
          <h2 className="card-title text-lg font-bold line-clamp-1 mb-0">{title}</h2>
          <div className="flex gap-2 items-center text-xs text-base-content/60 mt-1">
            <span className="badge badge-sm badge-outline">{genre}</span>
            <span>•</span>
            <span>{releaseYear}</span>
          </div>

          {/* Ratings Star Selector */}
          <div className="flex items-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none cursor-pointer transition-transform hover:scale-120"
                aria-label={`Rate ${star} stars`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={star <= rating ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={`w-5 h-5 transition-colors ${star <= rating ? "text-warning" : "text-base-content/20"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            ))}
            {rating > 0 && (
              <span className="text-xs font-semibold text-base-content/50 ml-1">{rating}/5</span>
            )}
          </div>

          {/* Personal Review Block */}
          <div className="mt-3 bg-base-200/40 p-2.5 rounded-lg border border-base-200">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={localReview}
                  onChange={(e) => setLocalReview(e.target.value)}
                  className="textarea textarea-bordered textarea-xs w-full h-16 resize-none focus:textarea-primary"
                  placeholder="Write your review or notes..."
                />
                <div className="flex justify-end gap-1">
                  <button 
                    onClick={() => { setIsEditing(false); setLocalReview(review); }} 
                    className="btn btn-xs btn-ghost"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveReview} 
                    className="btn btn-xs btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs italic text-base-content/85 line-clamp-3 min-h-[2.5rem]">
                  {review?.trim() ? `"${review}"` : "No personal review written yet."}
                </p>
                <div className="flex justify-end mt-1">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-[10px] text-primary hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {review?.trim() ? "Edit Review" : "Add Review"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card-actions flex gap-2 items-center justify-between mt-4">
          <button
            onClick={() => onToggleWatched(id)}
            className={`btn btn-sm flex-1 capitalize cursor-pointer ${watched ? 'btn-outline btn-success' : 'btn-neutral'}`}
          >
            {watched ? 'Mark Unwatched' : 'Mark Watched'}
          </button>
          
          <button
            onClick={() => onDeleteMovie(id)}
            className="btn btn-sm btn-square btn-error btn-outline cursor-pointer"
            aria-label="Delete movie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
