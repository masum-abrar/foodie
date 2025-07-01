import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FiClock, FiUsers, FiBookmark, FiShare2 } from 'react-icons/fi'
import { TbChefHat } from 'react-icons/tb'
import { GiCookingPot, GiMeal } from 'react-icons/gi'
import Navbar from '../components/Navbar'

export default function MealDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('instructions')

  useEffect(() => {
    setLoading(true)
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => {
        setMeal(res.data.meals[0])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  // Extract ingredients and measurements
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal?.[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="text-rose-500 text-4xl"
        >
          <TbChefHat />
        </motion.div>
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <GiMeal className="text-5xl text-rose-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Meal Not Found</h2>
        <p className="text-gray-600 max-w-md">
          We couldn't find the meal you're looking for. Please check the URL or try another meal.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-7 ">
       <motion.div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 to-amber-50/20" />
              <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f4ec532…/64e9a4e0…_noise-texture.png')] opacity-5 mix-blend-overlay" />
            </motion.div>
    
       <Navbar  darkBg />
 
      {/* Modern Glass Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20"
      >
        {/* Meal Header */}
        <div className="relative">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-rose-500/90 text-white rounded-full text-sm font-medium">
                {meal.strCategory}
              </span>
              <span className="px-3 py-1 bg-amber-500/90 text-white rounded-full text-sm font-medium">
                {meal.strArea}
              </span>
              {meal.strTags?.split(',').map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              {meal.strMeal}
            </motion.h1>
            
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <FiClock className="text-rose-300" />
                <span>30 mins</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-rose-300" />
                <span>4 servings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Content */}
        <div className="p-8">
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-8">
            <button className="p-2 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 transition-colors">
              <FiBookmark />
            </button>
            <button className="p-2 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 transition-colors">
              <FiShare2 />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('instructions')}
              className={`px-4 py-2 font-medium ${activeTab === 'instructions' ? 'text-rose-500 border-b-2 border-rose-500' : 'text-gray-500'}`}
            >
              Instructions
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 py-2 font-medium ${activeTab === 'ingredients' ? 'text-rose-500 border-b-2 border-rose-500' : 'text-gray-500'}`}
            >
              Ingredients
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'instructions' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose max-w-none"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <GiCookingPot className="text-rose-500" />
                  Cooking Instructions
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {meal.strInstructions}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              >
                {ingredients.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.ingredient}</p>
                      <p className="text-sm text-gray-500">{item.measure}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Video Embed */}
          {meal.strYoutube && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Video Tutorial</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                  className="w-full h-96"
                  allowFullScreen
                  title={meal.strMeal}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}