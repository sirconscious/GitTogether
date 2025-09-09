import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState , useEffect } from "react"; 
import { useContext } from "react"; 
import { useAuth } from "@/context/AuthContext";
import { 
  Home, User, Settings, LogOut, Menu, X, GitBranch, Activity, Users, Star,
  Send, Paperclip, Smile, MoreVertical, Phone, Video, Search, Hash,
  Circle, MessageSquare, Clock, Check, CheckCheck
} from "lucide-react";
import axios from "axios";
export default function ChatSpace() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [userListOpen, setUserListOpen] = useState(true); 
  const { authToken, setAuthToken } = useAuth(); 
  const [users , setUsers] = useState([]);
  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <MessageSquare size={20} />, label: "Chat", active: true },
    { icon: <GitBranch size={20} />, label: "Repositories" },
    { icon: <Users size={20} />, label: "Teams" },
    { icon: <Activity size={20} />, label: "Activity" },
    { icon: <User size={20} />, label: "Profile" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token') || sessionStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);  
      }
    }, [setAuthToken]);

    useEffect(() => {
      if (!authToken) return; // wait for token
      const fetchUsers = async () => {
        try {
          const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users', {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${authToken}`
            }
          });
          setUsers(res.data.users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      fetchUsers();
    }, [authToken]);    console.log("users", users);
  const conversations = [
    {
      id: 1,
      name: "Project Alpha Team",
      type: "group",
      avatar: "🚀",
      lastMessage: "Let's review the latest commits",
      timestamp: "2 min ago",
      unread: 3,
      online: true,
      members: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      type: "direct",
      avatar: "👩‍💻",
      lastMessage: "The bug fix is ready for testing",
      timestamp: "15 min ago",
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: "Backend Dev Squad",
      type: "group",
      avatar: "⚡",
      lastMessage: "Database migration completed",
      timestamp: "1 hour ago",
      unread: 1,
      online: false,
      members: 8
    },
    {
      id: 4,
      name: "Mike Chen",
      type: "direct",
      avatar: "👨‍🔬",
      lastMessage: "Thanks for the code review!",
      timestamp: "3 hours ago",
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: "UI/UX Design Team",
      type: "group",
      avatar: "🎨",
      lastMessage: "New mockups are in Figma",
      timestamp: "Yesterday",
      unread: 0,
      online: true,
      members: 4
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      avatar: "👩‍💻",
      message: "Hey everyone! I've just pushed the latest changes to the feature branch. Could someone review the pull request?",
      timestamp: "10:30 AM",
      status: "delivered",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      avatar: "👨‍💼",
      message: "I'll take a look at it right now. Thanks for the quick turnaround!",
      timestamp: "10:32 AM",
      status: "read",
      isOwn: true
    },
    {
      id: 3,
      sender: "Mike Chen",
      avatar: "👨‍🔬",
      message: "The automated tests are all passing. Great work on fixing those edge cases.",
      timestamp: "10:45 AM",
      status: "delivered",
      isOwn: false
    },
    {
      id: 4,
      sender: "Sarah Johnson",
      avatar: "👩‍💻",
      message: "Perfect! Should we schedule a demo for the client tomorrow?",
      timestamp: "11:15 AM",
      status: "delivered",
      isOwn: false
    },
    {
      id: 5,
      sender: "You",
      avatar: "👨‍💼",
      message: "Absolutely! I'll send out the meeting invite. Let's aim for 2 PM.",
      timestamp: "11:16 AM",
      status: "sending",
      isOwn: true
    }
  ];

  const onlineUsers = [
    { name: "Sarah Johnson", avatar: "👩‍💻", status: "Active", role: "Frontend Dev" },
    { name: "Mike Chen", avatar: "👨‍🔬", status: "In Meeting", role: "Backend Dev" },
    { name: "Emma Wilson", avatar: "👩‍🎨", status: "Active", role: "UI Designer" },
    { name: "Alex Rodriguez", avatar: "👨‍💻", status: "Away", role: "DevOps" },
    { name: "Lisa Park", avatar: "👩‍💼", status: "Active", role: "Project Manager" }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Animated Background */}
      <div className="fixed inset-0 animated-gradient opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      
      {/* Sidebar */}
      <div className={`
        relative z-20 flex flex-col bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border
        transition-all duration-300 ease-in-out shadow-2xl
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
              key={index}
              variant="ghost"
              className={`
                w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200
                ${item.active 
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

      {/* Chat Layout */}
      <div className="flex-1 flex relative z-10">
        {/* Conversations List */}
        <div className="w-80 bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Messages</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-accent/50 rounded-lg md:hidden"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-accent/20 border border-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {users.map((user, index) => (
              <div
                key={user?.id}
                onClick={() => setSelectedChat(index)}
                className={`
                  p-4 border-b border-border/20 cursor-pointer transition-all duration-200
                  hover:bg-accent/20 ${selectedChat === index ? 'bg-accent/30 border-l-4 border-l-primary' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
                      👨‍💼
                    </div>
                      <Circle className="absolute -bottom-1 -right-1 w-4 h-4 fill-green-500 text-green-500" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground truncate flex items-center gap-2">
                        {user?.name}
                        {/* {user.type === 'group' && <Hash size={12} className="text-muted-foreground" />} */}
                      </h3>
                      <span className="text-xs text-muted-foreground"></span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate"></p>
                    <div className="flex items-center justify-between mt-1">
                      {/* {conv.type === 'group' && (
                        <span className="text-xs text-muted-foreground">{conv.members} members</span>
                      )} */}
                      {/* {conv.unread > 0 && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{conv.unread}</span>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-card/30 backdrop-blur-xl">
          {/* Chat Header */}
          <div className="p-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
                  {conversations[selectedChat]?.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{conversations[selectedChat]?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {conversations[selectedChat]?.type === 'group' 
                      ? `${conversations[selectedChat]?.members} members • 3 online`
                      : 'Active now'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hover:bg-accent/50 rounded-lg">
                  <Phone size={18} />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-accent/50 rounded-lg">
                  <Video size={18} />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-accent/50 rounded-lg">
                  <MoreVertical size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUserListOpen(!userListOpen)}
                  className="hover:bg-accent/50 rounded-lg"
                >
                  <Users size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-sm flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className={`flex flex-col max-w-xs lg:max-w-md ${msg.isOwn ? 'items-end' : ''}`}>
                  <div className={`
                    px-4 py-2 rounded-2xl shadow-sm
                    ${msg.isOwn 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-accent/20 text-foreground rounded-bl-md'
                    }
                  `}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    {msg.isOwn && (
                      <div className="text-muted-foreground">
                        {msg.status === 'sending' && <Clock size={12} />}
                        {msg.status === 'delivered' && <Check size={12} />}
                        {msg.status === 'read' && <CheckCheck size={12} className="text-primary" />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-end gap-3">
              <Button variant="ghost" size="sm" className="hover:bg-accent/50 rounded-lg">
                <Paperclip size={18} />
              </Button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-accent/20 border border-border/30 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 pr-12"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-accent/50 rounded-lg"
                >
                  <Smile size={18} />
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-6 py-3"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Online Users Panel */}
        {userListOpen && (
          <div className="w-72 bg-card/80 backdrop-blur-xl border-l border-border/50 flex flex-col">
            <div className="p-4 border-b border-border/50">
              <h3 className="font-semibold text-foreground">Team Members</h3>
              <p className="text-sm text-muted-foreground">5 online</p>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {onlineUsers.map((user, index) => (
                <div key={index} className="p-3 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        {user.avatar}
                      </div>
                      <Circle 
                        className={`absolute -bottom-1 -right-1 w-3 h-3 ${
                          user.status === 'Active' ? 'fill-green-500 text-green-500' :
                          user.status === 'Away' ? 'fill-yellow-500 text-yellow-500' :
                          'fill-red-500 text-red-500'
                        }`} 
                        size={12} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{user.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                      <p className="text-xs text-muted-foreground">{user.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}