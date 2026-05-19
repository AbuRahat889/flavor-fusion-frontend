"use client";

import { Search, Facebook, Instagram, Twitter, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageSrc } from "@/lib/image";
import heroBurger from "@/assets/hero-burger.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">🔥 Hot & Fresh Daily</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Taste The</span>
              <br />
              <span className="text-gradient">Flavor Fusion</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-lg mx-auto lg:mx-0">
              Experience the perfect blend of flavors with our signature gourmet burgers, 
              crafted with love and the finest ingredients.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search your favorite food..."
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 h-auto">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">1M+</p>
                <p className="text-muted-foreground text-sm">Satisfied Customers</p>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-muted-foreground text-sm">Menu Items</p>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">4.9</p>
                <p className="text-muted-foreground text-sm">Customer Rating</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <span className="text-muted-foreground text-sm">Follow Us:</span>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-colors group">
                <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-colors group">
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-colors group">
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex items-center justify-center">
            {/* Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
            </div>
            
            {/* Main Image */}
            <div className="relative z-10 animate-float">
              <img
                src={getImageSrc(heroBurger)}
                alt="Delicious gourmet burger"
                className="w-full max-w-lg lg:max-w-xl drop-shadow-2xl"
              />
            </div>

            {/* Floating Play Button */}
            <button className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow hover:scale-110 transition-transform z-20">
              <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
            </button>

            {/* Floating Badge */}
            <div className="absolute top-8 right-8 lg:top-16 lg:right-8 glass-card px-4 py-3 z-20">
              <p className="text-sm font-medium text-foreground">⭐ Top Rated</p>
              <p className="text-xs text-muted-foreground">Best Seller 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
