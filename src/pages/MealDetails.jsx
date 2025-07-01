import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MealDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => setMeal(res.data.meals[0]))
  }, [id])
  if (!meal) return <div>Loading...</div>
  return (
    <div className="max-w-3xl mx-auto p-4">
      <img src={meal.strMealThumb} className="rounded w-full" />
      <h1 className="text-2xl font-bold my-4">{meal.strMeal}</h1>
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Area:</strong> {meal.strArea}</p>
      <h2 className="text-xl mt-4">Instructions:</h2>
      <p className="whitespace-pre-wrap">{meal.strInstructions}</p>
    </div>
  )
}
