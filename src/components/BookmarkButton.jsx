import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../features/bookmarks/bookmarkSlice';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function BookmarkButton({ meal, className }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector(s => s.bookmarks);
  const bookmarked = bookmarks.some(m => m.idMeal === meal.idMeal);

  return (
    <button 
      onClick={() => bookmarked ? dispatch(remove(meal.idMeal)) : dispatch(add(meal))}
      className={className}
      aria-label={bookmarked ? "Remove from favorites" : "Add to favorites"}
    >
      {bookmarked ? (
        <FaStar className="text-amber-400 text-lg" />
      ) : (
        <FaRegStar className="text-gray-400 hover:text-amber-400 text-lg transition-colors" />
      )}
    </button>
  );
}