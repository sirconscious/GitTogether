import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Main from "./Layouts/Main";
import LoginLayout from "./Layouts/LoginLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage"; 
import { userContext } from "./context/userContext"; 
import type { userType } from "./context/userContext"; 
import PrivateRoute from "./context/PrivateRoute"; 
import PublicRoute from "./context/PublicRoute";
function App() {
const [user, setUser] = useState<userType>(() => {
  const saved = sessionStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});
  return ( 
    <userContext.Provider value={{user , setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/login" element={<PublicRoute><LoginLayout /></PublicRoute> } />
          <Route path="/dashboard" element={<DashboardLayout />} > 
              <Route  index  element={<h1>This is a test</h1>} /> 
              <Route path="chat/:id?" element={<PrivateRoute><ChatPage/></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter> 
      </userContext.Provider>
  );
}

export default App;
