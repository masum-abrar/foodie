import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { TbMoodEmpty, TbLoader, TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import MealCard from './MealCard'

function intersectMeals(arr1, arr2) {
  const ids = new Set(arr2.map(m => m.idMeal))
  return arr1.filter(m => ids.has(m.idMeal))
}

export default function MealList() {
  const { meals, loading, error } = useSelector((state) => state.meals)
  const filtered = useSelector(state => state.meals.filteredMeals)
  const ingredientFiltered = useSelector(state => state.meals.ingredientFiltered)
  const [currentPage, setCurrentPage] = useState(1)
  const mealsPerPage = 8

  let toShow = meals

  if (ingredientFiltered.length > 0 && filtered.length > 0) {
    toShow = intersectMeals(ingredientFiltered, filtered)
  } else if (ingredientFiltered.length > 0) {
    toShow = ingredientFiltered
  } else if (filtered.length > 0) {
    toShow = filtered
  }

  // Pagination logic
  const indexOfLastMeal = currentPage * mealsPerPage
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage
  const currentMeals = toShow.slice(indexOfFirstMeal, indexOfLastMeal)
  const totalPages = Math.ceil(toShow.length / mealsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="relative px-4 py-12 max-w-8xl mx-auto">
      {/* Modern Animated Background */}
      <motion.div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 to-amber-50/20" />
        <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f4ec532…/64e9a4e0…_noise-texture.png')] opacity-5 mix-blend-overlay" />
      </motion.div>

      {/* State Handling with Animations */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <TbLoader className="text-4xl text-rose-500" />
            </motion.div>
            <p className="text-rose-700/80 font-medium">Loading delicious meals...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-100/50 border border-rose-200 rounded-xl p-6 max-w-md mx-auto text-center"
          >
            <h3 className="text-lg font-medium text-rose-800 mb-2">Error Loading Meals</h3>
            <p className="text-rose-700/80">{error}</p>
          </motion.div>
        )}

        {!loading && toShow.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <TbMoodEmpty className="text-5xl text-rose-400/70" />
            <h3 className="text-xl font-medium text-rose-800">No meals found</h3>
            <p className="text-rose-700/80 max-w-md text-center">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {!loading && toShow.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {currentMeals.map((meal, index) => (
                <motion.div
                  key={meal.idMeal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MealCard meal={meal} />
                </motion.div>
              ))}
            </motion.div>

            {/* Modern Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mt-12"
              >
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-rose-600 hover:bg-rose-100'}`}
                  >
                    <TbChevronLeft className="text-xl" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNumber = i + 1
                    // Show limited pages with ellipsis
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === pageNumber ? 'bg-rose-500 text-white' : 'text-rose-600 hover:bg-rose-50'}`}
                        >
                          {pageNumber}
                        </button>
                      )
                    } else if (
                      (pageNumber === currentPage - 2 && currentPage > 3) ||
                      (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={pageNumber} className="px-2 text-rose-400">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-rose-600 hover:bg-rose-100'}`}
                  >
                    <TbChevronRight className="text-xl" />
                  </button>
                </nav>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}