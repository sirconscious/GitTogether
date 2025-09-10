import { createContext , useContext } from "react";

export type userType = {
    id: string; 
    name: string;
    email: string;
    token: string; 
   
} 
type userContextType = {
    user : userType | null ; 
    setUser : (user : userType | null) => void ;
}
const userContext = createContext<userContextType | undefined>(undefined) ; 
const useUserContext = ()=>{
    const context = useContext(userContext);
    if(!context){
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}
export {userContext , useUserContext};
