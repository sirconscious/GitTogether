import React from 'react'
import type { JSX } from 'react'
import image from "../assets/image.png"
export default function AboutSection(): JSX.Element {
  return (
    <div className='h-screen  flex flex-col justify-center items-center bg-background p-8'>
        <h1 className='text-4xl'>Your All-in-One</h1> 
        <h1 className='text-4xl text-primary '>Team and Github-repo Managment</h1> 
        <img src={image} className='w-full sm:w-2/3 rounded-3xl' alt="" />
    </div>
  )
}
