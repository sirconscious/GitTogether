
import type { JSX } from "react";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection"; 
import Features from "@/components/Features"; 
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
export default function LandingPage(): JSX.Element { 

  return (
    <div className="h-full w-screen overflow-x-hidden">
      <HeroSection/>
    <AboutSection /> 
    <Features /> 
    <PricingSection />
  
    <Footer />
        </div>

  );
}
