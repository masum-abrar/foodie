import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  fetchIngredients,
  fetchByCategory,
  fetchByIngredients,
  clearFilter
} from '../features/meals/mealSlice'

export default function Filters() {
  const dispatch = useDispatch()
  const cats = useSelector(s => s.meals.categories)
  const ingredients = useSelector(s => s.meals.ingredients)
  const [selectedIngredients, setSelectedIngredients] = useState([])

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchIngredients())
  }, [dispatch])

  const handleCategoryChange = (e) => {
    const value = e.target.value
    if (value === '') dispatch(clearFilter())
    else dispatch(fetchByCategory(value))
  }

  const handleIngredientSelect = (e) => {
    const value = e.target.value
    setSelectedIngredients((prev) =>
      prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
    )
  }

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      dispatch(fetchByIngredients(selectedIngredients))
    }
  }, [selectedIngredients, dispatch])

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Category Dropdown */}
      <select onChange={handleCategoryChange} className="p-2 border rounded text-sm">
        <option value="">All Categories</option>
        {cats?.map(c => (
          <option key={c.idCategory} value={c.strCategory}>
            {c.strCategory}
          </option>
        ))}
      </select>

      {/* Ingredients Multi-select */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {ingredients?.slice(0, 20).map((ing) => (
          <label key={ing.idIngredient} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              value={ing.strIngredient}
              checked={selectedIngredients.includes(ing.strIngredient)}
              onChange={handleIngredientSelect}
            />
            {ing.strIngredient}
          </label>
        ))}
      </div>
    </div>
  )
}
