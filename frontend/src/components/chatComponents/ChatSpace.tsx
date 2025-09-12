import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;
const token = sessionStorage.getItem("token");
const echo = new Echo({
  broadcaster: "reverb",
  key: "mejldwuckjms4qb5r1g4",
  wsHost: "localhost", // Changed from localhost to 127.0.0.1
  wsPort: 8080,
  // wssPort: 8080,
  forceTLS: false,
  enabledTransports: ["ws"],
  disableStats: true,
  authEndpoint: "http://localhost:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  },
});

export default function ChatSpace() {
  const user = useUserContext();
  const [messages, setMessage] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    echo.connector.pusher.connection.bind("disconnected", () => {
      console.log("🔌 Disconnected from Reverb");
    });

    // Listen to the private channel with full debugging
    console.log("Attempting to subscribe to private channel: user.1");
    const channel = echo.private(`user.${user.user?.id}`);

    // Debug subscription success
    channel.subscribed(() => {
      console.log("✅ Successfully subscribed to private channel: user.1");
    });

    // Debug subscription errors
    channel.error((error: any) => {
      console.error("❌ Channel subscription error:", error);
      console.error("This usually means authentication failed");
    });

    // Listen for the actual message
    channel.listen("MessageEvent", (e: any) => {
      console.log("📨 Message received:", e.message);
      if (
        e.message.senderId === Number(params) ||
        e.message.reciverId === Number(params)
      ) {
        setMessage((prev) => [...prev, e.message]);
      }
    });

    return () => {
      console.log("🧹 Cleaning up channel subscription");
      echo.leaveChannel("private-user.1");
    };
  }, [user.user?.id]);

  const params = useParams().id;
  console.log("params", params);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${params}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      .then((data) => setMessage(data.data));
  }, [params]);
  const [currentMessage, setCurrentMessage] = useState<string>();
  const handleSubmit = async () => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
          {
            reciverId: params,
            content: currentMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${user.user.token}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) =>
          setMessage((prev) => [...prev, response.data.message])
        );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  console.log("the messages", messages);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message: any, index: number) => (
            <div
              key={index}
              className={`flex ${
                message.senderId === user.user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                  message.senderId === user.user?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground border border-border'
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
                {message.created_at && (
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            type="text"
            placeholder="Type your message..."
            value={currentMessage || ''}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && currentMessage?.trim()) {
                handleSubmit();
                setCurrentMessage('');
              }
            }}
          />
          <button
            onClick={() => {
              if (currentMessage?.trim()) {
                handleSubmit();
                setCurrentMessage('');
              }
            }}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
            disabled={!currentMessage?.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}