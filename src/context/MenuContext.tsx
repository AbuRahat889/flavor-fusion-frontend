"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Burger } from "@/types/burger";
import { getImageSrc } from "@/lib/image";
import burger1 from "@/assets/burger-1.jpg";
import burger2 from "@/assets/burger-2.jpg";
import burger3 from "@/assets/burger-3.jpg";
import burger4 from "@/assets/burger-4.jpg";
import burger5 from "@/assets/burger-5.jpg";
import burger6 from "@/assets/burger-6.jpg";

const initialBurgers: Burger[] = [
  { id: 1, name: "Classic Cheese Burger", description: "Juicy beef patty with melted cheddar cheese", price: 10.99, rating: 4.9, image: getImageSrc(burger1), category: "Beef" },
  { id: 2, name: "Bacon Deluxe", description: "Crispy bacon with onion rings and special sauce", price: 13.99, rating: 4.8, image: getImageSrc(burger2), category: "Premium" },
  { id: 3, name: "Spicy Jalapeño", description: "Hot jalapeños with pepper jack cheese", price: 11.99, rating: 4.7, image: getImageSrc(burger3), category: "Spicy" },
  { id: 4, name: "Mushroom Swiss", description: "Sautéed mushrooms with swiss cheese", price: 12.49, rating: 4.9, image: getImageSrc(burger4), category: "Gourmet" },
  { id: 5, name: "BBQ Stack", description: "BBQ sauce with cheddar and onion rings", price: 14.99, rating: 4.8, image: getImageSrc(burger5), category: "BBQ" },
  { id: 6, name: "Double Stack", description: "Double patty with double cheese and pickles", price: 15.99, rating: 5.0, image: getImageSrc(burger6), category: "Premium" },
];

interface MenuContextType {
  burgers: Burger[];
  addBurger: (b: Omit<Burger, "id">) => void;
  updateBurger: (id: number, b: Omit<Burger, "id">) => void;
  deleteBurger: (id: number) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [burgers, setBurgers] = useState<Burger[]>(initialBurgers);

  const addBurger = (b: Omit<Burger, "id">) =>
    setBurgers((prev) => [...prev, { ...b, id: Math.max(0, ...prev.map((x) => x.id)) + 1 }]);

  const updateBurger = (id: number, b: Omit<Burger, "id">) =>
    setBurgers((prev) => prev.map((x) => (x.id === id ? { ...b, id } : x)));

  const deleteBurger = (id: number) =>
    setBurgers((prev) => prev.filter((x) => x.id !== id));

  return (
    <MenuContext.Provider value={{ burgers, addBurger, updateBurger, deleteBurger }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
};
