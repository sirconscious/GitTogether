import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { JSX } from "react";
export default function HeroSection() { 
      const [menuOpen, setMenuOpen] = useState(false);

  return (
  <div className="relative h-screen w-screen flex flex-col items-center justify-center ">

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-md shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="text-xl font-bold text-foreground">GitTogether</div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6 text-foreground">
            <li><a href="#features" className="hover:text-accent transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-accent transition-colors">Pricing</a></li>
            <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/login" className="bg-accent text-accent-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-foreground focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-0 right-0 w-full h-full bg-background shadow-lg z-40 p-6 md:hidden"
        > 
            <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-foreground focus:outline-none"
            >
             <svg
  className="w-6 h-6"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>

            </button>
          </div>
<ul className="flex flex-col space-y-4 text-foreground">
  <li className="border-2 p-1 text-center animated-gradient delay-1">
    <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
  </li>
  <li className="border-2 p-1 text-center animated-gradient delay-2">
    <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
  </li>
  <li className="border-2 p-1 text-center animated-gradient delay-3">
    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
  </li>
  <li className="border-2 p-1 text-center animated-gradient delay-4">
    <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
  </li>
</ul>


        </motion.div>
      </motion.nav>

      {/* Animated Background Circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute -bottom-1/6 sm:-bottom-1/4 aspect-square w-full sm:w-1/2 rounded-full blur-3xl animated-gradient"
      />

      {/* Hero Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-foreground"
        >
          Welcome to GitTogether
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg md:text-xl mb-6 text-muted-foreground"
        >
          Collaborate with your dev team like never before.
        </motion.p> 
        <div className="w-full flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(231,138,83,0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-fit"
          >
            <Link to="/login" className="bg-ring text-accent-foreground px-6 py-3 rounded-md font-semibold">
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>

    </div>   )
}
