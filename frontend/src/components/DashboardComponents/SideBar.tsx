import React , {useEffect, useState} from 'react'
import type {JSX} from "react"  
import { Button } from "@/components/ui/button";
import { 
  Home, User, Settings, LogOut, Menu, X, GitBranch, Activity, Users, Star,
  Send, Paperclip, Smile, MoreVertical, Phone, Video, Search, Hash,
  Circle, MessageSquare, Clock, Check, CheckCheck
} from "lucide-react";
import { useParams  , useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
export default function SideBar() {  
      const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [currentPath , setCurrentPath] = useState<string>(''); 
    const location = useLocation().pathname.split('/');
    useEffect(()=>{
                setCurrentPath(location[location.length - 1]);
    },[location])
    const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard" , link : "/dashboard"},
    { icon: <MessageSquare size={20} />, label: "Chat", link: "/dashboard/chat" },
    { icon: <GitBranch size={20} />, label: "Repositories" },
    { icon: <Users size={20} />, label: "Teams" ,link: "/dashboard/teams"},
    { icon: <Activity size={20} />, label: "Activity" },
    { icon: <User size={20} />, label: "Profile" },
    { icon: <Settings size={20} />, label: "Settings" },
  ]; 
  const navigate = useNavigate();
  const handleNavigation = (link : string):void => {
        navigate(link);
  }
  return (
         <div className={`
        relative z-20 flex flex-col bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border
        transition-all duration-300 ease-in-out shadow-2xl h-full
        ${sidebarOpen ? 'w-72' : 'w-20'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl animated-gradient2 flex items-center justify-center">
              <GitBranch className="text-white" size={20} />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-sidebar-foreground">GitTogether</h1>
                <p className="text-xs text-sidebar-foreground/70">Chat Space</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Button 
                onClick={() => handleNavigation(item.link ? `${item.link}` : '/dashboard')}
              key={index}
              variant="ghost"
              className={`
                w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200
                ${item.label.toLowerCase() === currentPath 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg scale-105' 
                  : 'hover:bg-sidebar-accent/30 hover:scale-105 hover:shadow-md'
                }
                ${!sidebarOpen && 'justify-center'}
              `}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </div>
            </Button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border/50">
          <Button
            variant="ghost"
            className={`
              w-full justify-start gap-3 h-14 rounded-xl hover:bg-sidebar-accent/30
              ${!sidebarOpen && 'justify-center'}
            `}
          >
            <div className="w-8 h-8 rounded-full animated-gradient flex items-center justify-center relative">
              <User size={16} className="text-white" />
              <Circle className="absolute -bottom-1 -right-1 w-3 h-3 fill-green-500 text-green-500" size={12} />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm">John Doe</span>
                <span className="text-xs text-green-400">Online</span>
              </div>
            )}
          </Button>
        </div>
      </div>

  )
}
