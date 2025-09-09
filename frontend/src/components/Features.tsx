import React from 'react'
import { motion } from 'framer-motion'
import type { JSX } from 'react' 
import MagicBento from './MagicBento' 

export default function Features(): JSX.Element {
  return (
    <motion.div
      className='relative z-20 flex flex-col justify-center items-center bg-background p-8 overflow-hidden'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h1 className='text-4xl text-sidebar-ring font-bold mb-6'>Why choose GitTogether</h1>
      <MagicBento 
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
      />  
    </motion.div>
  )
}
