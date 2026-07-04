import { useState } from 'react';
import { validateMovie } from '../utils/validators';
import { toast } from 'react-toastify';

const initialFormState = { title: '', genre: '', releaseYear: '', posterUrl: '', rating: 0, review: '' };

export default function MovieForm({ onAddMovie }) {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedForm = {
      ...form,
      releaseYear: form.releaseYear ? parseInt(form.releaseYear, 10) : '',
      rating: form.rating ? parseInt(form.rating, 10) : 0
    };

    const { isValid, errors: validationErrors } = validateMovie(formattedForm);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    toast("Movie Submitted");
    onAddMovie(formattedForm);
    setForm(initialFormState);
    setErrors({});
  };
  const watchList = () => {
    toast("added to  watchList");
  } 
  return (
    <div className="collapse collapse-plus bg-base-100 shadow-sm border border-base-200 rounded-xl mb-8">
      <input type="checkbox" id="form-toggle" /> 
      <div className="collapse-title text-lg font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Movie
      </div>
      <div className="collapse-content"> 
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="form-control">
            <label className="label-text mb-1 font-semibold">Movie Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Interstellar"
              className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
            />
            {errors.title && <span className="text-xs text-error mt-1">{errors.title}</span>}
          </div>

          <div className="form-control">
            <label className="label-text mb-1 font-semibold">Genre *</label>
            <input
              type="text"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="e.g., Drama, Sci-Fi"
              className={`input input-bordered w-full ${errors.genre ? 'input-error' : ''}`}
            />
            {errors.genre && <span className="text-xs text-error mt-1">{errors.genre}</span>}
          </div>

          <div className="form-control">
            <label className="label-text mb-1 font-semibold">Release Year *</label>
            <input
              type="number"
              name="releaseYear"
              value={form.releaseYear}
              onChange={handleChange}
              placeholder="e.g., 2014"
              className={`input input-bordered w-full ${errors.releaseYear ? 'input-error' : ''}`}
            />
            {errors.releaseYear && <span className="text-xs text-error mt-1">{errors.releaseYear}</span>}
          </div>

          <div className="form-control">
            <label className="label-text mb-1 font-semibold">Poster Image URL (Optional)</label>
            <input
              type="text"
              name="posterUrl"
              value={form.posterUrl}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              className={`input input-bordered w-full ${errors.posterUrl ? 'input-error' : ''}`}
            />
            {errors.posterUrl && <span className="text-xs text-error mt-1">{errors.posterUrl}</span>}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text mb-1 font-semibold">Rating (Optional)</label>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                  className="focus:outline-none cursor-pointer transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= form.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`w-7 h-7 ${star <= form.rating ? "text-warning" : "text-base-content/30"}`}
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
              {form.rating > 0 && (
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, rating: 0 }))}
                  className="text-xs text-error hover:underline ml-2"
                >
                  Clear Rating
                </button>
              )}
            </div>
          </div>

          <div className="form-control md:col-span-2">
            <label className="label-text mb-1 font-semibold">Personal Review / Notes (Optional)</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              placeholder="Write your thoughts about the movie..."
              className="textarea textarea-bordered w-full h-20 focus:textarea-primary"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <button type="submit" className="btn btn-primary w-full sm:w-auto px-8 " onClick={watchList}>
              Add To Watchlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
