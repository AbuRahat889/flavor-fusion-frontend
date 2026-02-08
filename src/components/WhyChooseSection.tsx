import { Truck, Clock, Award, ShieldCheck, Utensils, Heart } from "lucide-react";

const features = [
  {
    icon: Utensils,
    title: "Fresh Ingredients",
    description: "We use only the freshest, locally-sourced ingredients in all our dishes.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Hot food delivered to your doorstep in 30 minutes or less.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as the best burger restaurant in the city for 5 years.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Every dish passes our rigorous quality standards before serving.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Enjoy free delivery on all orders over $25 within the city.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Our chefs pour their heart into every dish they create.",
  },
];

const WhyChooseSection = () => {
  return (
    <section id="about" className="py-20 relative bg-gradient-to-b from-background via-card/30 to-background">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">Why Choose Us</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Why We Are <span className="text-gradient">The Best</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We take pride in delivering exceptional food and service that keeps our customers coming back for more.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card p-8 hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
