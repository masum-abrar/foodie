import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMeals } from '../features/meals/mealSlice'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(fetchMeals(query))
  }

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        className="border px-4 py-2 w-full"
        placeholder="Search meals..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  )
}
