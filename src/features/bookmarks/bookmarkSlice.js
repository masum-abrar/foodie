import { createSlice } from '@reduxjs/toolkit'
const saved = JSON.parse(localStorage.getItem('bookmarks')) || []
const slice = createSlice({
  name: 'bookmarks',
  initialState: saved,
  reducers: {
    add: (state, action) => {
      state.push(action.payload)
      localStorage.setItem('bookmarks', JSON.stringify(state))
    },
    remove: (state, action) => {
      const newState = state.filter(m => m.idMeal !== action.payload)
      localStorage.setItem('bookmarks', JSON.stringify(newState))
      return newState
    }
  }
})
export const { add, remove } = slice.actions
export default slice.reducer
