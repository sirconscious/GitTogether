import { useEffect } from "react"; 
import { useLocation } from "react-router-dom";
import SideBar from "@/components/DashboardComponents/SideBar"; 
import { Outlet } from "react-router-dom";
import { useUserContext } from "@/context/userContext"; 
import axios from "axios";

export default function ChatSpace() {
  const location = useLocation();
  const { user, setUser } = useUserContext();

  // Parse token from URL
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); 

  useEffect(() => {
    const fetchUser = async () => {
      // Save token in sessionStorage if it exists
      if (token) {
        sessionStorage.setItem("token", token);
      }

      const tokenInStorage = sessionStorage.getItem("token");

      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/user",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${tokenInStorage}`,
            },
          }
        );

        const userData = { ...response.data, token: tokenInStorage || "" };

        // Save user in context
        if (!user) {
          setUser(userData);
        }

        // Save user in sessionStorage for persistence
        sessionStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Failed to fetch user:", err); 
        setUser(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      }
    };

    // Check if user is already in sessionStorage
    const savedUser = sessionStorage.getItem("user");
    if (savedUser && !user) {
      setUser(JSON.parse(savedUser));
    } else {
      fetchUser();
    }
  }, []); // runs once on mount

  console.log("User in dashboard:", user);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <SideBar />
      <div className="h-full w-full col-span-1 sm:col-span-1 flex flex-col border-2">
        <Outlet />
      </div>
    </div>
  );
}
