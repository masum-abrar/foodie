import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TbChefHat } from 'react-icons/tb';
import MealCard from './MealCard';

export default function FeaturedCarousel({ meals }) {

  const x = useMotionValue(0);
  const backgroundX = useTransform(x, [-100, 100], [20, -20]);

  return (
    <div className="relative px-4 py-20 max-w-8xl mx-auto overflow-hidden">
      
      <motion.div 
        style={{ x: backgroundX }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-amber-50/30" />
        <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f4ec532…/64e9a4e0…_noise-texture.png')] opacity-10 mix-blend-overlay" />
        
      
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: Math.random() * 100 }}
            animate={{ 
              y: [0, 50, 0],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute rounded-full opacity-10 ${i % 2 ? 'bg-rose-500' : 'bg-amber-400'}`}
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </motion.div>

     
     <motion.div 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  viewport={{ once: true }}
  className="mb-16 px-6 md:px-12 relative"
>
 
  <div className="absolute left-6 md:left-12 top-0 h-16 w-0.5 bg-gradient-to-b from-transparent via-rose-500 to-transparent" />
  
  <div className="flex flex-col space-y-4">
 
    <div className="flex items-center gap-3">
      <TbChefHat className="text-4xl text-rose-500" />
      <span className="text-sm uppercase tracking-[0.3em] font-medium text-rose-500">
        Featured Selection
      </span>
    </div>
    
   
    <h2 className="text-5xl md:text-7xl font-light leading-[0.9] tracking-tight text-gray-900">
      <span className="font-medium">Culinary</span><br />
      <span className="text-rose-500 font-normal">Masterpieces</span>
    </h2>
    
   
    <p className="text-lg text-gray-500 max-w-lg font-light tracking-wide leading-relaxed">
      Chef-curated dishes showcasing seasonal ingredients and innovative techniques
    </p>
  </div>

 
  <div className="absolute right-6 md:right-12 bottom-0 text-8xl opacity-5 font-bold text-gray-400 select-none">
    01
  </div>
</motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="px-8"
        onViewportEnter={() => x.set(0)}
      >
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          autoplay={{ 
            delay: 3500,
            disableOnInteraction: false 
          }}
          loop={true}
          className="!pb-16 !overflow-visible"
          onSlideChange={(swiper) => x.set(swiper.progress * 100)}
        >
          {meals.map((meal, index) => (
            <SwiperSlide 
              key={meal.idMeal} 
              className="!w-[280px] !md:w-[380px] transition-transform duration-500"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              >
                <MealCard meal={meal} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-600 mb-2 font-light tracking-wider">
            SCROLL TO DISCOVER
          </div>
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut"
            }}
            className="relative h-8 w-4"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-rose-500 to-amber-400 rounded-full" />
            <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full animate-ping" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}