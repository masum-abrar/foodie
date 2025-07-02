import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const texts = [
    "Gourmet Experiences",
    "Chef's Special Recipes",
    "Premium Dining Guide"
  ];

  const images = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1481&q=80",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1510&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    });
  }, [currentSlide, controls]);

  return (
    <div className="relative h-[90vh] max-h-[800px] w-full overflow-hidden">
     
      <div className="absolute inset-0 flex">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              zIndex: index === currentSlide ? 1 : 0
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 z-[2]" />
      </div>

     
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            className="max-w-2xl space-y-6" 
          >
            <motion.span 
              className="block text-sm uppercase tracking-[0.2em] text-rose-400 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Premium Dining Experience
            </motion.span>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]"
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif" }} 
            >
              Discover {texts[currentSlide]}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 350 }} 
            >
              Explore curated collections of the world's finest culinary experiences and elevate your dining journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-2" 
            >
              <button className="flex items-center gap-3 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-full transition-all duration-300 group shadow-lg hover:shadow-rose-500/30">
                <span className="tracking-wide">Explore Now</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

     
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {texts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-rose-500 w-6' : 'bg-white/30'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-rose-400/50 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-rose-400 rounded-full mt-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;