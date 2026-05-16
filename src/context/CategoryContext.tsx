import { createContext, useContext, useState, ReactNode } from "react";
import { Category } from "@/types/admin";

const initial: Category[] = [
  { id: 1, name: "Beef", description: "Classic beef-based burgers" },
  { id: 2, name: "Premium", description: "Our top-tier signature creations" },
  { id: 3, name: "Spicy", description: "Burgers with a kick" },
  { id: 4, name: "Gourmet", description: "Chef's special gourmet picks" },
  { id: 5, name: "BBQ", description: "Smoky BBQ-style burgers" },
];

interface CategoryContextType {
  categories: Category[];
  addCategory: (c: Omit<Category, "id">) => void;
  updateCategory: (id: number, c: Omit<Category, "id">) => void;
  deleteCategory: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(initial);
  const addCategory = (c: Omit<Category, "id">) =>
    setCategories((prev) => [...prev, { ...c, id: Math.max(0, ...prev.map((x) => x.id)) + 1 }]);
  const updateCategory = (id: number, c: Omit<Category, "id">) =>
    setCategories((prev) => prev.map((x) => (x.id === id ? { ...c, id } : x)));
  const deleteCategory = (id: number) =>
    setCategories((prev) => prev.filter((x) => x.id !== id));
  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategories must be used within CategoryProvider");
  return ctx;
};
