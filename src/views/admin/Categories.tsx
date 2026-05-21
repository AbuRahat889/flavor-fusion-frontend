"use client";

import { ProductsTableSk } from "@/components/Skleton/ProductsTableSk";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { handleApiResponse } from "@/lib/handleRTKResponse";
import {
  useCreateCategoriesMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoriesApi";
import { Category } from "@/types/admin";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

type FormState = Omit<Category, "id">;
const empty: FormState = { name: "", description: "" };

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  const { data, isLoading, isFetching, isError } = useGetAllCategoriesQuery("");
  const categories = data?.data || [];

  const openAdd = () => {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
  };
  const openEdit = (c: Category) => {
    setEditingId(c.id);
    setForm({ name: c.name, description: c.description ?? "" });
    setOpen(true);
  };

  const [createFN, { isLoading: isCreating }] = useCreateCategoriesMutation();
  const [updateFN, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
    };
    const res = await handleApiResponse(
      editingId ? updateFN : createFN,
      editingId ? { id: editingId, data: payload } : payload,
      editingId
        ? "Category updated successfully"
        : "Category created successfully",
    );
    if (res?.success) {
      setOpen(false);
    }
  };

  const [deleteFN, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const handleDelete = async (id: string) => {
    if (isDeleting) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isDeleting ? "Deleting..." : "Yes, delete it!",
      allowOutsideClick: !isDeleting,
      didOpen: () => {
        if (isDeleting) {
          Swal.showLoading();
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const res = await handleApiResponse(
          deleteFN,
          id,
          "Product deleted successfully",
          false,
        );
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: res?.error || "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-primary">Failed to load categories.</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Category Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Organize your menu with categories
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        {isLoading || isFetching ? (
          <ProductsTableSk />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((c: Category) => {
                  return (
                    <TableRow key={c.id}>
                      <TableCell>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {c.name}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {c.description || "—"}
                      </TableCell>
                      <TableCell className="text-foreground font-medium">
                        {c.productCount}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEdit(c)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(c.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {categories?.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground py-12"
                    >
                      No categories yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingId !== null ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cname">Name</Label>
              <Input
                id="cname"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cdesc">Description</Label>
              <Textarea
                id="cdesc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />
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
                    : "Save Changes"
                  : isCreating
                    ? "Creating..."
                    : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
