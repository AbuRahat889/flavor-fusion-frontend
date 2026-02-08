import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ChefSection from "@/components/ChefSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MenuSection />
      <WhyChooseSection />
      <ChefSection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
