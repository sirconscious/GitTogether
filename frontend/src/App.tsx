import { Button } from "@/components/ui/button"
import DarkModeToggle from "./components/DarkModeToggle"
import { LoginForm } from "./components/login-form"   
import LoginLayout from "./Layouts/LoginLayout"
import Main from "./Layouts/Main" 
import { BrowserRouter , Route ,Routes , } from "react-router-dom" 
import LandingPage from "./pages/LandingPage"
function App() {
  return (
    <>
    <BrowserRouter> 
             <Routes> 
                <Route path="/" element={<Main />}>
                  <Route index element={<LandingPage />} />
                </Route> 
                <Route path="/login" element={<LoginLayout />} />
              </Routes>
    </BrowserRouter>
    </>
  )
}

export default App