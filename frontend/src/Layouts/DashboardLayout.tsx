import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaUser />, label: "Profile" },
    { icon: <FaCog />, label: "Settings" },
    { icon: <FaSignOutAlt />, label: "Logout", destructive: true },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans relative">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Sidebar */}
      <motion.div
        className="z-10 flex flex-col bg-sidebar text-sidebar-foreground border-r-2 w-64 py-8 px-5 shadow-lg"
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <Card className="mb-8 p-4 text-center bg-sidebar-ring text-sidebar-border text-2xl">
          Dashboard
        </Card>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "justify-start gap-3 w-full",
                item.destructive
                  ? "text-destructive hover:bg-destructive/10"
                  : "hover:bg-sidebar-accent/20"
              )}
            >
              {item.icon} {item.label}
            </Button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 p-6 overflow-auto">
        <Button
          className="md:hidden mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          Toggle Sidebar
        </Button>
        <Card className="p-6 w-full bg-card text-card-foreground rounded-lg shadow-md min-h-[80vh]">
         <h1 className="text-2xl font-bold">Welcome to your dashboard!</h1>
        </Card>
      </div>
    </div>
  );
}
