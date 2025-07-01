import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  fetchIngredients,
  fetchByCategory,
  fetchByIngredients,
  clearFilter
} from '../features/meals/mealSlice'
import { FiFilter, FiX, FiCheck } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function RoseFilters() {
  const dispatch = useDispatch()
  const { categories, ingredients } = useSelector(state => state.meals)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchIngredients())
  }, [dispatch])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    if (category === '') {
      dispatch(clearFilter())
    } else {
      dispatch(fetchByCategory(category))
    }
    setSelectedIngredients([])
  }

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    )
    setSelectedCategory('')
  }

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      dispatch(fetchByIngredients(selectedIngredients))
    } else if (selectedIngredients.length === 0 && !selectedCategory) {
      dispatch(clearFilter())
    }
  }, [selectedIngredients, dispatch, selectedCategory])

  const clearAllFilters = () => {
    setSelectedCategory('')
    setSelectedIngredients([])
    dispatch(clearFilter())
  }

  return (
    <div className="bg-rose-50/30 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-rose-100/50 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-rose-800">
          <FiFilter className="text-rose-500" />
          Filter Meals
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-rose-500 hover:text-rose-700 transition-colors"
        >
          {isExpanded ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-rose-700 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === ''
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-300/50'
                      : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  All
                </motion.button>
                {categories?.map(category => (
                  <motion.button
                    key={category.idCategory}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(category.strCategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.strCategory
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-300/50'
                        : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    {category.strCategory}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Ingredients Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-rose-700">Ingredients</h3>
                {selectedIngredients.length > 0 && (
                  <button
                    onClick={() => setSelectedIngredients([])}
                    className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
                  >
                    <FiX size={12} /> Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {ingredients?.slice(0, 15).map(ingredient => (
                  <motion.div
                    key={ingredient.idIngredient}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleIngredientToggle(ingredient.strIngredient)}
                    className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                      selectedIngredients.includes(ingredient.strIngredient)
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-300/50'
                        : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    <span className="text-sm truncate">{ingredient.strIngredient}</span>
                    {selectedIngredients.includes(ingredient.strIngredient) && (
                      <FiCheck className="ml-2" size={14} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory || selectedIngredients.length > 0) && (
              <div className="mt-4 pt-4 border-t border-rose-200/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-rose-700">Active filters:</span>
                  {selectedCategory && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      {selectedCategory}
                      <button
                        onClick={() => handleCategoryChange('')}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        <FiX size={14} />
                      </button>
                    </motion.div>
                  )}
                  {selectedIngredients.map(ingredient => (
                    <motion.div
                      key={ingredient}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      {ingredient}
                      <button
                        onClick={() => handleIngredientToggle(ingredient)}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        <FiX size={14} />
                      </button>
                    </motion.div>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="ml-auto text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
                  >
                    <FiX size={12} /> Clear all
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}