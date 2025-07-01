import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../features/bookmarks/bookmarkSlice'

export default function BookmarkButton({ meal }) {
  const dispatch = useDispatch()
  const bookmarks = useSelector(s => s.bookmarks)
  const bookmarked = bookmarks.some(m => m.idMeal === meal.idMeal)
  return bookmarked
    ? <button onClick={() => dispatch(remove(meal.idMeal))}>⭐️ Remove</button>
    : <button onClick={() => dispatch(add(meal))}>☆ Bookmark</button>
}
