import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Items } from "@/types/burger";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductCard({
  item,
  index,
}: {
  item: Items;
  index: number;
  loading: boolean;
}) {
  const { addToCart } = useCart();
  const handleAddToCart = (item: Items) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div>
      <div
        className="group glass-card overflow-hidden hover:border-primary/30 transition-all duration-300"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={item?.image}
            alt={item?.name}
            width={700}
            height={700}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Category Badge */}
          <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {item?.category?.name}
          </span>

          {/* Rating */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-card/80 backdrop-blur-sm rounded-full">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-xs font-medium text-foreground">
              {item?.rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            {item?.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {item?.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ৳ {item?.price}
            </span>
            <Button
              size="sm"
              onClick={() => handleAddToCart(item)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
