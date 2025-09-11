import React, { useEffect } from 'react'
import type { JSX } from "react"
import UserComponent from '@/components/chatComponents/UserComponent'
import { useUserContext } from '@/context/userContext'

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

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
            Authorization: `Bearer 54|NE6o12L51MW68nPDPzupean9Fb7J0HCUF71yEfYJffee7a27`,
            Accept: 'application/json',
        },
    }
});

export default function ChatPage(): JSX.Element {

    useEffect(() => {
        console.log("=== DEBUGGING ECHO CONNECTION ===");
        console.log("Token:", sessionStorage.getItem("token"));
        
        // Check if Echo is connected
        echo.connector.pusher.connection.bind('connected', () => {
            console.log('✅ Successfully connected to Reverb');
        });
        
        echo.connector.pusher.connection.bind('error', (error: any) => {
            console.error('❌ Connection error:', error);
        });

        echo.connector.pusher.connection.bind('disconnected', () => {
            console.log('🔌 Disconnected from Reverb');
        });

        // Listen to the private channel with full debugging
        console.log("Attempting to subscribe to private channel: user.1");
        const channel = echo.private('user.1');
        
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
            console.log('📨 Message received:', e);
        });

        return () => {
            console.log("🧹 Cleaning up channel subscription");
            echo.leaveChannel('private-user.1');
        };
    }, []);

    const { user } = useUserContext();

    console.log("User in ChatPage:", user);
    console.log("Token in sessionStorage:", sessionStorage.getItem("token"));

    return (
        <div className='h-full w-full col-span-2 grid sm:grid-cols-4'>
            <UserComponent />
            <div className=" col-span-3 border-2">
                Chat will be here
                <button 
                    onClick={() => console.log("Current connection state:", echo.connector.pusher.connection.state)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Check Connection State
                </button>
            </div>
        </div>
    )
}