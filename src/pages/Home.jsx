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
        <section className='mb-10 mt-10'>
          <FeaturedCarousel meals={meals.slice(0, 8)} />
        </section>
      )}

         <h1 className="text-3xl text-center my-6 font-bold">🍽 Meal Explorer</h1>
         
         <SearchBar />
          <Filters/>
         <MealList />
         <RandomMealModal/>
        <Banner/>
       </div>
   </div>
  )
}

export default Home