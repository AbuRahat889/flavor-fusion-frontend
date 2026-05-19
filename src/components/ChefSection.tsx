"use client";

import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageSrc } from "@/lib/image";
import chefImage from "@/assets/chef.jpg";

const ChefSection = () => {
  return (
    <section id="chef" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={getImageSrc(chefImage)}
                alt="Our Master Chef"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 glass-card p-6 max-w-xs">
              <p className="text-4xl font-bold text-primary mb-1">15+</p>
              <p className="text-foreground font-medium">Years of Experience</p>
              <p className="text-muted-foreground text-sm mt-1">
                Crafting culinary masterpieces with passion
              </p>
            </div>

            {/* Quote Badge */}
            <div className="absolute -top-4 -left-4 lg:top-8 lg:-left-8 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Quote className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Meet Our Chef
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Crafted By <span className="text-gradient">Master Hands</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our Executive Chef brings over 15 years of culinary excellence to every dish. 
              With a passion for innovation and respect for tradition, each burger is a 
              masterpiece of flavor and presentation.
            </p>

            {/* Highlights */}
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <p className="text-foreground">Trained at Le Cordon Bleu, Paris</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <p className="text-foreground">Michelin Star Restaurant Experience</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <p className="text-foreground">Award-Winning Signature Recipes</p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="glass-card p-6 border-l-4 border-primary">
              <p className="text-foreground italic">
                "Food is not just about taste—it's about creating memories, bringing people 
                together, and expressing love through every single bite."
              </p>
              <footer className="mt-3 text-muted-foreground text-sm">
                — Chef Marcus Chen, Executive Chef
              </footer>
            </blockquote>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Book a Table
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefSection;
