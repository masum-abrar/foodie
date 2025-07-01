import { useSelector } from 'react-redux'
import MealCard from '../components/MealCard'
export default function Bookmarks() {
  const bm = useSelector(s => s.bookmarks)
  if (bm.length === 0) return <div>No bookmarks yet.</div>
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{bm.map(m => <MealCard key={m.idMeal} meal={m} />)}</div>
}
