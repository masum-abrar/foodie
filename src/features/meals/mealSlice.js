import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 🔍 Meal search
export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (search = '') => {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    return res.data.meals
  }
)

// 🎲 Random meal
export const fetchRandom = createAsyncThunk('meals/fetchRandom', async () => {
  const res = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
  return res.data.meals[0]
})

// 📦 All category list
export const fetchCategories = createAsyncThunk('meals/fetchCategories', async () => {
  const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
  return res.data.categories
})

// 🔃 Meals filtered by category
export const fetchByCategory = createAsyncThunk('meals/fetchByCategory', async (category) => {
  const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  return res.data.meals
})

// mealSlice.js বা thunk ফাইলে
export const fetchIngredients = createAsyncThunk('meals/fetchIngredients', async () => {
  const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  return res.data.meals
})

// export const fetchByIngredients = createAsyncThunk(
//   'meals/fetchByIngredients',
//   async (ingredientsArray) => {
//     const query = ingredientsArray.join(',')
//     const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
//     return res.data.meals
//   }
// )
// in mealSlice.js
export const fetchByIngredients = createAsyncThunk(
  'meals/fetchByIngredients',
  async (ingredients) => {
    const responses = await Promise.all(
      ingredients.map((ing) =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
      )
    )

    const allMeals = responses.flatMap(res => res.data.meals || [])

    // Remove duplicate meals (by idMeal)
    const unique = {}
    allMeals.forEach(meal => {
      unique[meal.idMeal] = meal
    })

    return Object.values(unique)
  }
)





const mealSlice = createSlice({
  name: 'meals',
  initialState: {
    meals: [],             // For searched meals
    randomMeal: null,      // For random meal modal
    categories: [],        // For dropdown (filter)
     ingredients: [],        // 🆕 Dropdown দেখাবে
  ingredientFiltered: [], 
    filteredMeals: [],     // Meals by category
    loading: false,
    error: null,
  },
  reducers: {
    clearRandom: (state) => {
      state.randomMeal = null
    },
    clearFilter: (state) => {
      state.filteredMeals = []
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔍 Meal search
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false
        state.meals = action.payload || []
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // 🎲 Random meal
      .addCase(fetchRandom.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRandom.fulfilled, (state, action) => {
        state.loading = false
        state.randomMeal = action.payload
      })
      .addCase(fetchRandom.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // 📦 All categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload || []
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // 🔃 Filter meals by category
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.filteredMeals = action.payload || []
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

// Ingredients fetch
.addCase(fetchIngredients.fulfilled, (state, action) => {
  state.ingredients = action.payload || []
})

// Ingredients filter
// .addCase(fetchByIngredients.fulfilled, (state, action) => {
//   state.ingredientFiltered = action.payload || []
// })

.addCase(fetchByIngredients.fulfilled, (state, action) => {
  state.ingredientFiltered = action.payload || []
})


  },
})

export const { clearRandom, clearFilter } = mealSlice.actions
export default mealSlice.reducer
