import React from 'react'
import { Link } from 'react-router-dom'
import BookmarkButton from './BookmarkButton'

export default function MealCard({ meal }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-4">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded" />
      <h2 className="text-lg font-semibold mt-2">{meal.strMeal}</h2>
      <p className="text-sm text-gray-500">{meal.strCategory}</p>

      <Link to={`/meal/${meal.idMeal}`}>View Details</Link>
      <BookmarkButton meal={meal} />

    </div>
  )
}
