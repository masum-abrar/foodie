import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRandom } from '../features/meals/randomSlice'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX,  FiExternalLink } from 'react-icons/fi'
import { TbChefHat } from 'react-icons/tb'

export default function RandomMealModal() {
  const dispatch = useDispatch()
  const random = useSelector(s => s.meals.randomMeal)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = async () => {
    setIsLoading(true)
    setIsOpen(true)
    await dispatch(fetchRandom())
    setIsLoading(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    dispatch({ type: 'meals/clearRandom' })
  }

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Random Meal Button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-rose-300/50 transition-all"
      >
        {/* <FiDice5 className="text-lg" /> */}
        <span className="font-medium">Random Meal</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <TbChefHat className="text-4xl text-rose-500" />
                  </motion.div>
                  <p className="text-rose-700 font-medium">Finding a delicious random meal...</p>
                </div>
              ) : random ? (
                <>
                  {/* Meal Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img 
                      src={random.strMealThumb} 
                      alt={random.strMeal}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  {/* Meal Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-3xl font-bold text-gray-900">{random.strMeal}</h2>
                      <button 
                        onClick={handleClose}
                        className="p-2 text-gray-500 hover:text-rose-500 transition-colors"
                      >
                        <FiX className="text-xl" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {random.strTags?.split(',')?.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {random.strArea} • {random.strCategory}
                      </span>
                      <Link 
                        to={`/meal/${random.idMeal}`}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-colors"
                      >
                        <span>View Recipe</span>
                        <FiExternalLink size={16} />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-700">Couldn't find a random meal. Please try again.</p>
                  <button
                    onClick={handleOpen}
                    className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-full"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}