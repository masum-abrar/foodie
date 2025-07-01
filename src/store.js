import { configureStore } from '@reduxjs/toolkit'

import mealReducer from './features/meals/mealSlice'
import bookmarkReducer from './features/bookmarks/bookmarkSlice'
export const store = configureStore({
  reducer: {
    meals: mealReducer,
    bookmarks: bookmarkReducer
  },
})
