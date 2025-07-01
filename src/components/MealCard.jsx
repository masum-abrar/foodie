import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import BookmarkButton from './BookmarkButton';

export default function MealCard({ meal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ 
        duration: 0.4,
        type: 'spring',
        bounce: 0.25
      }}
      className="group relative bg-white dark:bg-gray-850 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-400 will-change-transform"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Bookmark/Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <BookmarkButton 
            meal={meal} 
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5 pt-4">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 tracking-tight">
              {meal.strMeal}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium px-2 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 rounded-full">
                {meal.strCategory}
              </span>
              {meal.strArea && (
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  {meal.strArea}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-5">
          <Link 
            to={`/meal/${meal.idMeal}`}
            className="flex items-center justify-between group-hover:underline underline-offset-4 decoration-2 decoration-rose-400"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              View Recipe Details
            </span>
            <FiArrowRight className="text-rose-500 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}