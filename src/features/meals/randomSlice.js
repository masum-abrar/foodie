import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchRandom = createAsyncThunk('meals/fetchRandom', async () => {
  const res = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
  return res.data.meals[0]
})
