import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { MdOutlineFastfood } from 'react-icons/md'
import { motion } from 'framer-motion'
export default function Navbar({ darkBg = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Random Meal', path: '/random' },
    { name: 'Favorite', path: '/favorites' },
  ]

  const toggleMenu = () => setMenuOpen(!menuOpen)

  
 const [hasScrolled, setHasScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setScrollDirection('down')
    } else {
      setScrollDirection('up')
    }

    
    setHasScrolled(currentScrollY > 20)

    setLastScrollY(currentScrollY)
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [lastScrollY])


  return (
   <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl 
        ${hasScrolled || darkBg ? 'bg-black/70' : 'bg-white/30'}
        backdrop-blur-md shadow-lg border border-white/20 
        rounded-2xl px-6 py-3 transition-all duration-300
        ${scrollDirection === 'down' ? 'top-[-100px]' : 'top-4'}`}
    >

      <div className="flex justify-between items-center">
       
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-wider 
                        text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
          <MdOutlineFastfood className="text-2xl text-red-500" />
         <span className='text-white'> MealVerse</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <motion.div
          key={item.name}
          whileHover={{ y: -2 }}
        >
          <Link
            to={item.path}
            className="text-white hover:text-rose-500 font-medium transition-colors"
          >
            {item.name}
          </Link>
        </motion.div>
          ))}
        </div>

       
        <div className="md:hidden text-gray-700" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-3 md:hidden bg-white/80 backdrop-blur-lg shadow-lg rounded-xl px-6 py-4 transition">
          {navItems.map((item) => (
            <motion.div
          key={item.name}
          whileHover={{ y: -2 }}
        >
          <Link
            to={item.path}
            className="text-rose-700/80 hover:text-rose-500 font-medium transition-colors"
          >
            {item.name}
          </Link>
        </motion.div>
          ))}
        </div>
      )}
    </nav>
  )
}
