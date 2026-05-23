import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { Categories, Items } from "@/types/burger";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categorieData } = useGetAllCategoriesQuery("");

  const { data } = useGetAllProductsQuery({
    categoryId: activeCategory === "All" ? undefined : activeCategory,
    page: currentPage,
    limit: 2,
  });
  const products = data?.data?.items || [];
  const totalPages = data?.data?.meta?.totalPages || 1;

  const categories = useMemo(
    () => [
      { id: "All", name: "All" },
      ...Array.from(
        new Set(
          categorieData?.data?.map((b: Categories) => ({
            name: b?.name,
            id: b?.id,
          })),
        ),
      ),
    ],
    [categorieData],
  );

  return (
    <section id="menu" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Our Menu
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Our Popular <span className="text-gradient">Burgers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted selection of premium burgers made with the
            freshest ingredients and cooked to perfection.
          </p>
        </div>
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories?.map((category: Categories) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category?.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {category?.name || "All"}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((item: Items, index: number) => (
            <ProductCard key={item?.id} item={item} index={index} />
          ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
          >
            {totalPages === currentPage ? "No More Items" : "View Full Menu"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
