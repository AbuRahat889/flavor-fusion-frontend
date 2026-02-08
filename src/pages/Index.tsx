import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ChefSection from "@/components/ChefSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MenuSection />
      <WhyChooseSection />
      <ChefSection />
      <Footer />
    </div>
  );
};

export default Index;
