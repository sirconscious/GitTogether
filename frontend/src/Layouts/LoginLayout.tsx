import React from "react";
import { LoginForm } from "@/components/login-form";
import { motion } from "framer-motion";
import { useUserContext } from "@/context/userContext"

export default function LoginLayout() { 
  const {user} = useUserContext() ;
  console.log("User in LoginLayout:", user);
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center bg-[linear-gradient(56deg,rgba(231,138,83,1)_0%,rgba(34,34,34,1)_50%,rgba(251,203,151,1)_100%)] bg-[length:200%_200%]"
      initial={{ backgroundPosition: "200% 0%" }}
      animate={{ backgroundPosition: "0% 0%" }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <LoginForm />
    </motion.div>
  );
}
