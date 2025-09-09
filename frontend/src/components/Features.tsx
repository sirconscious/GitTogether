import React from 'react'
import type { JSX } from 'react' 
import MagicBento from './MagicBento' 
import  LiquidEther  from './LiquidEther'
export default function Features(): JSX.Element {
  return (
    <div className='relative h-screen flex  flex-col justify-center items-center bg-background p-8 overflow-hidden'>
     
<div style={{ width: '100%', height: '100%', position: 'absolute' }} >
  <LiquidEther
    colors={[ '#e78a53',  '#fbcb97' ,'#e78a53']}
    mouseForce={20}
    cursorSize={50}
    isViscous={true}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={true}
    autoDemo={true} 
    
    autoSpeed={0.6}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
    />
    </div>    
        <h1 className='text-4xl text-foreground text-bold'>Why choose GitTogether</h1>
        <MagicBento />
    </div>
  )
}
