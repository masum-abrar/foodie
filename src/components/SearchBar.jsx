import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMeals } from '../features/meals/mealSlice';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoseSearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // Sample trending searches (replace with your actual data)
  const trendingSearches = ['Pasta', 'Salad', 'Chicken', 'Dessert', 'Vegan'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchMeals(query));
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    dispatch(fetchMeals(suggestion));
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (query.length > 2) {
      // Here you could add debounced API calls for live suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 relative ">
      <form 
        onSubmit={handleSearch}
        className={`relative transition-all duration-300 ${isFocused ? 'ring-4 ring-rose-200/30' : ''}`}
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            className="w-full px-6 py-4 pr-12 rounded-2xl border-0 bg-rose-50/70 backdrop-blur-md text-rose-900 placeholder-rose-400/70 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-lg transition-all"
            placeholder="Search for meals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            aria-label="Search meals"
          />
          
          <div className="absolute right-3 flex items-center space-x-2">
            {query && (
              <motion.button
                type="button"
                onClick={handleClear}
                className="text-rose-400 hover:text-rose-600 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FiX size={20} />
              </motion.button>
            )}
            
            <button
              type="submit"
              className="p-2 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full shadow-lg hover:shadow-rose-300/50 transition-all"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute z-10 mt-2 w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-rose-100"
          >
            <div className="py-2">
              <h3 className="px-4 py-2 text-xs font-semibold text-rose-500 uppercase tracking-wider">
                Trending Searches
              </h3>
              {trendingSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-4 py-2 text-rose-800 hover:bg-rose-50/50 transition-colors flex items-center"
                >
                  <FiSearch className="mr-2 text-rose-400" size={14} />
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}