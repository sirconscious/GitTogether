import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

import Main from "./Layouts/Main";
import LoginLayout from "./Layouts/LoginLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import ChatSpace from "./Layouts/Chatspace";
import LandingPage from "./pages/LandingPage";

function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Load token from sessionStorage when app starts
  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/login" element={<LoginLayout />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/messages" element={<ChatSpace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
