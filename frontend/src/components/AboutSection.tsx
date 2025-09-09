import React from 'react'
import { motion } from 'framer-motion'
import type { JSX } from 'react'
import image from "../assets/image.png"
export default function AboutSection(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } }
  }

  return (
    <motion.div
      className='z-10 h-screen relative flex flex-col justify-center items-center bg-background p-8 '
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    > 
  
      <motion.h1
        className='text-4xl'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Your All-in-One
      </motion.h1>
      
      <motion.h1
        className='text-4xl text-primary mt-2'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Team and Github-repo Management
      </motion.h1>
      
      <motion.img
        src={image}
        className='border-2 relative w-full sm:w-2/3 rounded-3xl mt-6'
        alt="About"
        variants={imageVariants}
      />

      {/* Animated gradient blurs */}
      {/* <motion.div 

      className="absolute left-0 sm:w-[300px] sm:h-[300px] blur-3xl animated-gradient"></motion.div>
      <motion.div  
      
      className="absolute left-0 bottom-0 sm:w-[300px] sm:h-[300px] blur-xl animated-gradient"></motion.div>
      <div className="absolute right-0 sm:w-[300px] sm:h-[300px] blur-3xl animated-gradient"></div>
      <div className="absolute right-0 bottom-0 sm:w-[300px] sm:h-[300px] blur-xl animated-gradient"></div> */}
    </motion.div>
  )
}
