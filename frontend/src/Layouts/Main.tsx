import React from 'react'
import { Outlet } from 'react-router-dom' 
export default function Main() {
  return (
    <div>  
        <div className="h-screen flex flex-col items-center justify-center">  
        <Outlet />

        </div>
    </div>
  )
}
