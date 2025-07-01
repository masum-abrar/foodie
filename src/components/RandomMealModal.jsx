import { useSelector, useDispatch } from 'react-redux'
import { fetchRandom } from '../features/meals/randomSlice'
import { Link } from 'react-router-dom'
export default function RandomMealModal() {
  const dispatch = useDispatch()
  const random = useSelector(s => s.meals.randomMeal)
  const open = Boolean(random)
  return (
    <>
      <button onClick={() => dispatch(fetchRandom())}>🎲 Random Meal</button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-11/12 max-w-md">
            <img src={random.strMealThumb} className="rounded" />
            <h2 className="text-xl font-bold">{random.strMeal}</h2>
            <button onClick={() => dispatch({ type: 'meals/clearRandom' })}>Close</button>
            <Link to={`/meal/${random.idMeal}`}>View Details</Link>
          </div>
        </div>
      )}
    </>
  )
}
