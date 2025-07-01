import React from 'react'
import { useSelector } from 'react-redux'
import MealCard from './MealCard'

function intersectMeals(arr1, arr2) {
  const ids = new Set(arr2.map(m => m.idMeal))
  return arr1.filter(m => ids.has(m.idMeal))
}

export default function MealList() {
  const { meals, loading, error } = useSelector((state) => state.meals)
  const filtered = useSelector(state => state.meals.filteredMeals)
  const ingredientFiltered = useSelector(state => state.meals.ingredientFiltered)

  let toShow = meals

  if (ingredientFiltered.length > 0 && filtered.length > 0) {
    toShow = intersectMeals(ingredientFiltered, filtered)
  } else if (ingredientFiltered.length > 0) {
    toShow = ingredientFiltered
  } else if (filtered.length > 0) {
    toShow = filtered
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (toShow.length === 0) return <div className="text-center py-10">No meals found.</div>

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {toShow.map(meal => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  )
}
