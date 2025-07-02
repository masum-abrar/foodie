import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../features/bookmarks/bookmarkSlice';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function BookmarkButton({ meal, className }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector(s => s.bookmarks);
  const bookmarked = bookmarks.some(m => m.idMeal === meal.idMeal);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const handleBookmark = () => {
    if (bookmarked) {
      dispatch(remove(meal.idMeal));
      setToastMessage('Removed from favorites');
      setToastType('remove');
    } else {
      dispatch(add(meal));
      setToastMessage('Added to favorites!');
      setToastType('add');
    }
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <button 
        onClick={handleBookmark}
        className={`${className} group relative`}
        aria-label={bookmarked ? "Remove from favorites" : "Add to favorites"}
      >
        {bookmarked ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
          >
            <FaStar className="text-amber-400 text-lg" />
          </motion.div>
        ) : (
          <FaRegStar className="text-gray-400 group-hover:text-amber-400 text-lg transition-colors" />
        )}
        <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-rose-500 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {bookmarked ? '-' : '+'}
        </span>
      </button>

      {/* Modern Toast Notification */}
    <AnimatePresence>
  {showToast && (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
        toastType === 'add' ? 'bg-rose-500' : 'bg-amber-500'
      } text-white text-sm font-medium`}
    >
      <FaStar className="flex-shrink-0" />
      <span className="whitespace-nowrap">{toastMessage}</span>
      <button 
        onClick={() => setShowToast(false)}
        className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <FiX className="text-xs" />
      </button>
      
      {/* Progress bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 3, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg"
      />
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}