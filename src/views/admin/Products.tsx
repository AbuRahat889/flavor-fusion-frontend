"use client";

import { Button } from "@/components/ui/button";

import defaultImage from "@/assets/placeholder.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleApiResponse } from "@/lib/handleRTKResponse";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/productsApi";
import { Burger } from "@/types/burger";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AddProduct from "./AddProduct";
import Swal from "sweetalert2";

type FormState = Omit<Burger, "id">;
const empty: FormState = {
  name: "",
  description: "",
  price: 0,
  rating: 4.5,
  image: "",
  category: "Beef",
};

const Products = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  const { data } = useGetAllProductsQuery("");
  const products = data?.data?.items || [];

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...empty, category: "" });
    setOpen(true);
  };
  const openEdit = (b: Burger) => {
    setEditingId(b.id);
    const { ...rest } = b;
    setForm(rest);
    setOpen(true);
  };

  const [deleteFN, { isLoading: isDeleting }] = useDeleteProductMutation();
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Product Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Add, edit, and remove menu items
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Description
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <Image
                      src={b.image || defaultImage}
                      alt={b.name}
                      width={480}
                      height={480}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {b.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      {b.category?.name}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm max-w-xs truncate">
                    {b.description}
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    ৳ {b.price}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span className="text-sm">{b?.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(b)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(b.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {products?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-12"
                  >
                    No products yet. Click "Add Product" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddProduct
        open={open}
        setOpen={setOpen}
        editingId={editingId}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default Products;
