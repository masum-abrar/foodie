import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBookmark, FiHeart } from 'react-icons/fi'
import {FaStar, FaRegStar} from 'react-icons/fa'
import MealCard from '../components/MealCard'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Bookmarks() {
  const bookmarks = useSelector(state => state.bookmarks)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/20 to-amber-50/20 py-12 px-4 sm:px-6 lg:px-8">
      <Navbar darkBg />
      <div className="max-w-7xl mx-auto mt-12">
      
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="mb-16 px-6 md:px-12 relative"
>
 
  <div className="absolute left-6 md:left-12 top-0 h-20 w-0.5 bg-gradient-to-b from-transparent via-rose-500 to-transparent" />
  
  <div className="flex flex-col space-y-4">
   
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="flex items-center gap-3"
    >
      <div className="p-3 bg-rose-500/10 rounded-xl backdrop-blur-sm">
        <FaStar className="text-3xl text-rose-500" />
      </div>
      <span className="text-sm uppercase tracking-[0.3em] font-medium text-rose-500">
        Culinary Treasures
      </span>
    </motion.div>
    
    
    <h1 className="text-5xl md:text-6xl font-light leading-[0.9] tracking-tight">
      <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
        Your Favorite
      </span><br />
      <span className="font-normal text-gray-900">Recipes</span>
    </h1>
    
    
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-lg text-gray-500 max-w-lg font-light tracking-wide leading-relaxed"
    >
      {bookmarks.length > 0 
        ? "A collection of your most-loved culinary creations" 
        : "Your personal recipe archive awaits - start saving your favorites"}
    </motion.p>
  </div>

 
  <div className="absolute right-6 md:right-12 bottom-0 text-8xl opacity-5 font-bold text-rose-400 select-none">
    {bookmarks.length || 0}
  </div>
</motion.div>

       
        <AnimatePresence>
          {bookmarks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-rose-100"
            >
              <FiHeart className="text-5xl text-rose-300 mb-4" />
              <h2 className="text-2xl font-medium text-gray-800 mb-2">No favorites yet</h2>
              <p className="text-gray-600 max-w-md text-center mb-6">
                Save your favorite recipes by clicking the favorite icon on any meal
              </p>
              {/* <Link href='/'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-rose-300/50 transition-all"
              >
                Browse Recipes
              </motion.button>
              </Link> */}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {bookmarks.map((meal, index) => (
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
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}