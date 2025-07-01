import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchCategories = createAsyncThunk('meals/cats', async () => {
  const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  return res.data.meals
})
export const fetchByCategory = createAsyncThunk('meals/byCategory', async (cat) => {
  const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  return res.data.meals
})
