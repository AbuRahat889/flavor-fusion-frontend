import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { handleApiResponse } from "@/lib/handleRTKResponse";
import { useGetAllCategoriesQuery } from "@/redux/api/categoriesApi";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productsApi";
import React from "react";

interface Category {
  id: string;
  name: string;
}

export default function AddProduct({
  open,
  setOpen,
  editingId,
  form,
  setForm,
}) {
  const { data } = useGetAllCategoriesQuery("");
  const categories = data?.data || [];

  const [createFN, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateFN, { isLoading: isUpdating }] = useUpdateProductMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: form.price,
      image: form.image,
      categoryId: form.category,
    };
    const res = await handleApiResponse(
      editingId !== null ? updateFN : createFN,
      editingId !== null ? { id: editingId, data: payload } : payload,
      editingId !== null
        ? "Product updated successfully"
        : "Product created successfully",
    );
    if (res?.success) {
      setOpen(false);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingId !== null ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (৳)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rating: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={
                  form?.category?.id
                    ? form.category.id
                    : form?.category
                      ? form.category
                      : ""
                }
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {categories?.map((c: Category) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="url"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {editingId !== null
                  ? isUpdating
                    ? "Updating..."
                    : "Update Product"
                  : isCreating
                    ? "Saving..."
                    : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
