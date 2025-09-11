import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useUserContext } from '@/context/userContext'; 
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'; 

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;
const token = sessionStorage.getItem("token")
const echo = new Echo({
    broadcaster: 'reverb',
    key: 'mejldwuckjms4qb5r1g4',
    wsHost: 'localhost', // Changed from localhost to 127.0.0.1
    wsPort: 8080,
    // wssPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws'],
    disableStats: true, 
    authEndpoint : "http://localhost:8000/broadcasting/auth",
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }
});



export default function ChatSpace() {   
        const user = useUserContext()
        const [messages , setMessage] = useState([]) ;

      useEffect(() => {
          console.log("=== DEBUGGING ECHO CONNECTION ===");
          console.log("Token:", sessionStorage.getItem("token"));
          
          // Check if Echo is connected
          // echo.connector.pusher.connection.bind('connected', () => {
          //     console.log('✅ Successfully connected to Reverb');
          // });
          
          // echo.connector.pusher.connection.bind('error', (error: any) => {
          //     console.error('❌ Connection error:', error);
          // });
  
          echo.connector.pusher.connection.bind('disconnected', () => {
              console.log('🔌 Disconnected from Reverb');
          });
  
          // Listen to the private channel with full debugging
          console.log("Attempting to subscribe to private channel: user.1");
          const channel = echo.private(`user.${user.user?.id}`);
          
          // Debug subscription success
          channel.subscribed(() => {
              console.log('✅ Successfully subscribed to private channel: user.1');
          });
  
          // Debug subscription errors
          channel.error((error: any) => {
              console.error('❌ Channel subscription error:', error);
              console.error('This usually means authentication failed');
          });
  
          // Listen for the actual message
          channel.listen('MessageEvent', (e: any) => {
              console.log('📨 Message received:', e.message); 
          setMessage(prev => [...prev, e.message]);
          });
  
          return () => {
              console.log("🧹 Cleaning up channel subscription");
              echo.leaveChannel('private-user.1');
          };
      }, [user.user?.id]);
  
  
      const params = useParams().id ; 
          console.log("params", params)   
      useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${params}`,{
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.user.token}`,
          }
        }).then((data)=>setMessage(data.data)) 
      },[params]) 
      const [currentMessage , setCurrentMessage] = useState<string>() 
        const handleSubmit = async()=>{
            try {
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
              {
              reciverId: params,
              content: currentMessage,
              },
              {
              headers: {
                Authorization: `Bearer ${user.user.token}`,
                Accept: 'application/json',
              },
              }
            ).then(response=> setMessage(prev => [...prev, response.data.message]));
            } catch (error) {
            console.error('Error sending message:', error);
            }
        } 
              console.log("the messages" , messages) 

  return (
    <div>
        chat will be here 

        <input className='bg-white' type="text" onChange={(e)=>setCurrentMessage(e.target.value)} /> 
        <button onClick={handleSubmit}>send</button>
    </div>
  )
}
