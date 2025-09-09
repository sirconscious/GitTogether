import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { JSX } from "react";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection"; 
import LaserFlowBoxExample from "@/components/Info"; 
import Features from "@/components/Features";
export default function LandingPage(): JSX.Element { 

  return (
    <div className="h-full w-screen overflow-x-hidden">
      <HeroSection/>
    <AboutSection /> 
    {/* <LaserFlowBoxExample/>  */}
    <Features />
        </div>

  );
}
