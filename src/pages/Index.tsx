import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import TrustStrip from "@/components/landing/TrustStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Differentiation from "@/components/landing/Differentiation";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TrustStrip />
        <HowItWorks />
        <Features />
        <Differentiation />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
