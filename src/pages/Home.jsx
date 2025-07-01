import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MealList from '../components/MealList'
import { fetchMeals } from '../features/meals/mealSlice'
import { useDispatch, useSelector } from 'react-redux'
import RandomMealModal from '../components/RandomMealModal'
import Filters from '../components/Filters'
import FeaturedCarousel from '../components/FeaturedCarousel'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import { TbFilterSearch } from 'react-icons/tb'
import { motion } from 'framer-motion'
const Home = () => {
     const { meals, status, error } = useSelector(state => state.meals)
 const dispatch = useDispatch()
  
 useEffect(() => {
   dispatch(fetchMeals('chicken'))
    }, [])

  return (
   <div>


<Navbar/>

<Banner />
       {status === 'loading' && <div className="text-center py-10">Loading...</div>}
       {status === 'failed' && <div className="text-center text-red-500">Error: {error}</div>}
       {status === 'succeeded' && meals.length === 0 && <div className="text-center py-10">No meals found.</div>}

     <div className="">
 

       {meals.length > 0 && (
        <section className=''>
          <FeaturedCarousel meals={meals.slice(0, 16)} />
        </section>
      )}

         {/* <h1 className="text-3xl text-center my-6 font-bold">🍽 Meal Explorer</h1> */}
         
        <div className="relative px-4 py-20 max-w-8xl mx-auto overflow-hidden">
            {/* Modern Animated Background (Same as FeaturedCarousel) */}
            <motion.div 
              className="absolute inset-0 -z-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-amber-50/30" />
              <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f4ec532…/64e9a4e0…_noise-texture.png')] opacity-10 mix-blend-overlay" />
              
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, x: Math.random() * 100 }}
                  animate={{ 
                    y: [0, 50, 0],
                    x: [0, Math.random() * 20 - 10, 0]
                  }}
                  transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute rounded-full opacity-10 ${i % 2 ? 'bg-rose-500' : 'bg-amber-400'}`}
                  style={{
                    width: `${50 + Math.random() * 100}px`,
                    height: `${50 + Math.random() * 100}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    filter: 'blur(40px)'
                  }}
                />
              ))}
            </motion.div>
      
            {/* Consistent Asymmetric Header */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="mb-16 px-6 md:px-12 relative"
            >
              <div className="absolute left-6 md:left-12 top-0 h-16 w-0.5 bg-gradient-to-b from-transparent via-rose-500 to-transparent" />
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <TbFilterSearch className="text-4xl text-rose-500" />
                  <span className="text-sm uppercase tracking-[0.3em] font-medium text-rose-500">
                    Refine Your Search
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-light leading-[0.9] tracking-tight text-gray-900">
                  <span className="font-medium">Discover</span><br />
                  <span className="text-rose-500 font-normal">Perfect Meals</span>
                </h2>
                
                <p className="text-lg text-gray-500 max-w-lg font-light tracking-wide leading-relaxed">
                  Use our powerful filters to find exactly what you're craving
                </p>
              </div>
      
              <div className="absolute right-6 md:right-12 bottom-0 text-8xl opacity-5 font-bold text-gray-400 select-none">
                02
              </div>
            </motion.div>
      
            {/* Search and Filter Components */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="px-8"
            >
              <div className="space-y-8">
                {/* Search Bar with Glassmorphism */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className=""
                >
                  <SearchBar />
                </motion.div>
      
                {/* Filters with Glassmorphism */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className=""
                >
                  <Filters />
                </motion.div>
              </div>
            </motion.div>
      
            {/* Modern Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-600 mb-2 font-light tracking-wider">
                  REFINE YOUR SEARCH
                </div>
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5,
                    ease: "easeInOut"
                  }}
                  className="relative h-8 w-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-rose-500 to-amber-400 rounded-full" />
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full animate-ping" />
                </motion.div>
              </div>
              
            </motion.div>
            
          </div>
          <MealList />
        
         <RandomMealModal/>
        
       </div>
   </div>
  )
}

export default Home