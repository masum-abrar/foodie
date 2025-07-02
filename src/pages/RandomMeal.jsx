import React from 'react'
import RandomMealModal from '../components/RandomMealModal'
import { FiBookmark, FiHeart } from 'react-icons/fi'
import {FaStar, FaRegStar} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { div } from 'framer-motion/client'
import Navbar from '../components/Navbar'
const RandomMeal = () => {
  return (
  <div>
    <Navbar darkBg />
      <div>
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="mb-16 px-6 md:px-12 relative mt-24"
>
  {/* Decorative line */}
  <div className="absolute left-6 md:left-[38%] top-0 h-20 w-0.5 bg-gradient-to-b from-transparent via-rose-500 to-transparent " />
  
  <div className="flex flex-col space-y-4 items-center">
    {/* Icon with animated pulse */}
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
        Discover Treasures
      </span>
    </motion.div>
    
    {/* Modern typography with gradient */}
    
    
 
    
  </div>

  
</motion.div>
        <RandomMealModal />
    </div>
</div>
  )
}

export default RandomMeal