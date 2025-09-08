import React from 'react'
import { LoginForm } from '@/components/login-form'
export default function LoginLayout() {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-[linear-gradient(56deg,rgba(231,138,83,1)_0%,rgba(34,34,34,1)_50%,rgba(251,203,151,1)_100%)]'>
  
        <LoginForm />
    </div>
  )
}
