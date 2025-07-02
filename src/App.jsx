import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MealDetails from './pages/MealDetails'
import Bookmarks from './pages/Bookmarks'
import RandomMeal from './pages/RandomMeal'


function App() {
 


  return (
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/meals" element={<h1 className="text-3xl text-center my-6 font-bold">Meal List</h1>} />
    <Route path="/meal/:id" element={<MealDetails/>} />
    <Route path="/favorites" element={<Bookmarks/>} />
    <Route path='/random' element={<RandomMeal/>} />
   </Routes>
  )
}

export default App
