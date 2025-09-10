import React , {useEffect} from 'react'
import type {JSX} from "react" 
import UserComponent from '@/components/chatComponents/UserComponent'
import { useUserContext } from '@/context/userContext'
export default function ChatPage():JSX.Element { 
    const {user } = useUserContext(); 
    console.log("User in ChatPage:", user); 
    console.log(sessionStorage.getItem("token")) ;
  return (
    <div className='h-full w-full col-span-2 grid sm:grid-cols-4'>
        <UserComponent/> 
        <div className=" col-span-3 border-2">Chat will be here</div>
    </div>
  )
}
