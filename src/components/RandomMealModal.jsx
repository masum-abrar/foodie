import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRandom } from '../features/meals/randomSlice'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX,  FiExternalLink   } from 'react-icons/fi'
import { FaDiceFive } from 'react-icons/fa'

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

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
     
     <div className="relative px-6 md:px-12 mb-12">
       <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-amber-50/30" />
       <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f4ec532…/64e9a4e0…_noise-texture.png')] opacity-10 mix-blend-overlay" />
 
  {/* <div className="absolute left-12 top-0 h-24 w-0.5 bg-rose-500 to-transparent" /> */}
  <div className="absolute right-12 bottom-0 text-8xl opacity-5 font-bold text-rose-400 select-none">
    ?
  </div>

  <div className="flex flex-col items-center text-center">
  
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-6  mt-10"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
          Feeling Adventurous?
        </span>
      </h2>
      <p className="text-lg text-rose-600/80 max-w-md">
        Let us surprise you with a random culinary delight
      </p>
    </motion.div>

    
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group"
    >
      <motion.button
        onClick={handleOpen}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-xl hover:shadow-rose-300/50 transition-all"
      >
        <motion.div
          animate={{ 
            rotate: [0, 15, -15, 0],
            transition: { 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }
          }}
        >
        <FaDiceFive className="text-xl " />

        </motion.div>
        <span className="font-semibold text-lg">Generate Random Meal</span>
      </motion.button>
      
      
      <motion.div
        className="absolute inset-0 rounded-full bg-rose-400/30 blur-md -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>

   
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-rose-300 rounded-full"
          animate={{
            y: [0, -5, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity
          }}
        />
      ))}
    </div>
  </div>
</div>

      
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