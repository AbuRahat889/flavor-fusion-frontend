import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Burger } from "@/types/burger";
import { toast } from "sonner";
import burger1 from "@/assets/burger-1.jpg";
import burger2 from "@/assets/burger-2.jpg";
import burger3 from "@/assets/burger-3.jpg";
import burger4 from "@/assets/burger-4.jpg";
import burger5 from "@/assets/burger-5.jpg";
import burger6 from "@/assets/burger-6.jpg";

const burgers: Burger[] = [
  {
    id: 1,
    name: "Classic Cheese Burger",
    description: "Juicy beef patty with melted cheddar cheese",
    price: 10.99,
    rating: 4.9,
    image: burger1,
    category: "Beef",
  },
  {
    id: 2,
    name: "Bacon Deluxe",
    description: "Crispy bacon with onion rings and special sauce",
    price: 13.99,
    rating: 4.8,
    image: burger2,
    category: "Premium",
  },
  {
    id: 3,
    name: "Spicy Jalapeño",
    description: "Hot jalapeños with pepper jack cheese",
    price: 11.99,
    rating: 4.7,
    image: burger3,
    category: "Spicy",
  },
  {
    id: 4,
    name: "Mushroom Swiss",
    description: "Sautéed mushrooms with swiss cheese",
    price: 12.49,
    rating: 4.9,
    image: burger4,
    category: "Gourmet",
  },
  {
    id: 5,
    name: "BBQ Stack",
    description: "BBQ sauce with cheddar and onion rings",
    price: 14.99,
    rating: 4.8,
    image: burger5,
    category: "BBQ",
  },
  {
    id: 6,
    name: "Double Stack",
    description: "Double patty with double cheese and pickles",
    price: 15.99,
    rating: 5.0,
    image: burger6,
    category: "Premium",
  },
];

const categories = ["All", "Beef", "Premium", "Spicy", "Gourmet", "BBQ"];

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const filteredBurgers = activeCategory === "All" 
    ? burgers 
    : burgers.filter(burger => burger.category === activeCategory);

  const handleAddToCart = (burger: Burger) => {
    addToCart(burger);
    toast.success(`${burger.name} added to cart!`);
  };

  return (
    <section id="menu" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">Our Menu</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Our Popular <span className="text-gradient">Burgers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted selection of premium burgers made with the freshest ingredients and cooked to perfection.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBurgers.map((burger, index) => (
            <div
              key={burger.id}
              className="group glass-card overflow-hidden hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={burger.image}
                  alt={burger.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                  {burger.category}
                </span>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-card/80 backdrop-blur-sm rounded-full">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-xs font-medium text-foreground">{burger.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {burger.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {burger.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${burger.price.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(burger)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
