import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Home, User, Settings, LogOut, Menu, X, GitBranch, Activity, Users, Star } from "lucide-react";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <GitBranch size={20} />, label: "Repositories" },
    { icon: <Users size={20} />, label: "Teams" },
    { icon: <Activity size={20} />, label: "Activity" },
    { icon: <User size={20} />, label: "Profile" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  const stats = [
    { label: "Active Projects", value: "12", change: "+2" },
    { label: "Team Members", value: "48", change: "+5" },
    { label: "Commits Today", value: "127", change: "+23" },
    { label: "Issues Resolved", value: "8", change: "+3" },
  ];

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
                <p className="text-xs text-sidebar-foreground/70">Collaborative Platform</p>
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
            <div className="w-8 h-8 rounded-full animated-gradient flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm">John Doe</span>
                <span className="text-xs text-sidebar-foreground/70">john@example.com</span>
              </div>
            )}
          </Button>
        </div>

        {/* Logout */}
        <div className="p-4">
          <Button
            variant="ghost"
            className={`
              w-full justify-start gap-3 h-12 rounded-xl
              text-destructive hover:bg-destructive/10 hover:scale-105
              ${!sidebarOpen && 'justify-center'}
            `}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-accent/50 rounded-lg"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <div>
                <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
                <p className="text-sm text-muted-foreground">Welcome back, John!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-accent/20 rounded-lg px-3 py-2">
                <Star size={16} className="text-primary fill-primary" />
                <span className="text-sm font-medium">Pro Plan</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    {stat.change}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Card */}
          <Card className="p-8 bg-card/30 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl min-h-[60vh] relative overflow-hidden">
            <div className="absolute inset-0 animated-gradient opacity-5" />
            <div className="relative z-10">
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl animated-gradient2 flex items-center justify-center">
                  <Activity className="text-white" size={32} />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Welcome to GitTogether
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Your collaborative development platform is ready. Start managing your projects, 
                  coordinating with your team, and tracking your progress all in one place.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Create New Project
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-accent/50 px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300">
                    View Documentation
                  </Button>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 rounded-xl bg-accent/10 border border-border/30 hover:bg-accent/20 transition-all duration-300 hover:scale-105">
                  <GitBranch className="text-primary mb-4" size={24} />
                  <h3 className="font-semibold text-foreground mb-2">Git Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Seamless integration with your favorite Git repositories and workflow tools.
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-accent/10 border border-border/30 hover:bg-accent/20 transition-all duration-300 hover:scale-105">
                  <Users className="text-primary mb-4" size={24} />
                  <h3 className="font-semibold text-foreground mb-2">Team Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time collaboration features to keep your team synchronized and productive.
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-accent/10 border border-border/30 hover:bg-accent/20 transition-all duration-300 hover:scale-105">
                  <Activity className="text-primary mb-4" size={24} />
                  <h3 className="font-semibold text-foreground mb-2">Analytics & Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed analytics and insights to track your project progress and team performance.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}