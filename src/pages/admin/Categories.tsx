import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCategories } from "@/context/CategoryContext";
import { useMenu } from "@/context/MenuContext";
import { Category } from "@/types/admin";
import { toast } from "sonner";

type FormState = Omit<Category, "id">;
const empty: FormState = { name: "", description: "" };

const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { burgers } = useMenu();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  const openAdd = () => { setEditingId(null); setForm(empty); setOpen(true); };
  const openEdit = (c: Category) => {
    setEditingId(c.id);
    setForm({ name: c.name, description: c.description ?? "" });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Category name required");
      return;
    }
    if (editingId !== null) {
      updateCategory(editingId, form);
      toast.success("Category updated");
    } else {
      addCategory(form);
      toast.success("Category added");
    }
    setOpen(false);
  };

  const handleDelete = (c: Category) => {
    const count = burgers.filter((b) => b.category === c.name).length;
    if (count > 0) {
      toast.error(`Cannot delete: ${count} product(s) use this category`);
      return;
    }
    if (confirm(`Delete category "${c.name}"?`)) {
      deleteCategory(c.id);
      toast.success("Category deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Category Management</h2>
          <p className="text-sm text-muted-foreground">Organize your menu with categories</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((c) => {
                const count = burgers.filter((b) => b.category === c.name).length;
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{c.name}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{c.description || "—"}</TableCell>
                    <TableCell className="text-foreground font-medium">{count}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(c)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(c)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                    No categories yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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
              <Input id="cname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cdesc">Description</Label>
              <Textarea id="cdesc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {editingId !== null ? "Save Changes" : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
