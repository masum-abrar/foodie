import React from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'
import { MdOutlineFastfood } from 'react-icons/md'
import { Link } from 'react-router-dom'
export const Footer = () => {


    const items = [
    { name: 'Home', path: '/' },
    { name: 'Random', path: '/random' },
    { name: 'Favorite', path: '/favorites' },
  ];
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
     className="bg-gradient-to-b from-rose-100/80 to-white/90 border-t border-rose-200/60 backdrop-blur-md"
>
      <div className="max-w-7xl mx-auto px-6 py-12 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 text-2xl font-bold"
          >
            <MdOutlineFastfood className="text-rose-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
              MealVerse
            </span>
          </motion.div>

          {/* Navigation Links */}
           <div className="flex flex-wrap justify-center gap-6 md:gap-10">
      {items.map((item) => (
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

          {/* Social Icons */}
          <div className="flex gap-5">
            {[FiGithub, FiTwitter, FiInstagram].map((Icon, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-rose-600 hover:text-rose-500 bg-white rounded-full shadow-sm hover:shadow-rose-200/50 transition-all"
                href="#"
              >
                <Icon className="text-lg" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-rose-200/50 to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-rose-600/70 text-sm">
            &copy; {new Date().getFullYear()} MealVerse. All rights reserved.
          </p>
          
         
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-rose-600/70 hover:text-rose-500">Terms</a>
            <a href="#" className="text-rose-600/70 hover:text-rose-500">Privacy</a>
            <a href="#" className="text-rose-600/70 hover:text-rose-500">Cookies</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}