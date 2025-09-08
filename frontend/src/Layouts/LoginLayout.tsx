import React from 'react'
import { LoginForm } from '@/components/login-form'
export default function LoginLayout() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <LoginForm />
    </div>
  )
}
