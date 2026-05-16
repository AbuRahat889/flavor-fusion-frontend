import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, ArrowLeft, UtensilsCrossed, DollarSign, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMenu } from "@/context/MenuContext";
import { Burger } from "@/types/burger";
import { toast } from "sonner";

type FormState = Omit<Burger, "id">;

const empty: FormState = {
  name: "",
  description: "",
  price: 0,
  rating: 4.5,
  image: "",
  category: "Beef",
};

const Admin = () => {
  const { burgers, addBurger, updateBurger, deleteBurger } = useMenu();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  const openAdd = () => {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (b: Burger) => {
    setEditingId(b.id);
    const { id, ...rest } = b;
    setForm(rest);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.image || form.price <= 0) {
      toast.error("Please fill in name, image URL and a valid price");
      return;
    }
    if (editingId !== null) {
      updateBurger(editingId, form);
      toast.success("Burger updated");
    } else {
      addBurger(form);
      toast.success("Burger added");
    }
    setOpen(false);
  };

  const handleDelete = (b: Burger) => {
    if (confirm(`Delete "${b.name}"?`)) {
      deleteBurger(b.id);
      toast.success("Burger deleted");
    }
  };

  const totalRevenue = burgers.reduce((s, b) => s + b.price, 0);
  const avgRating = burgers.length ? (burgers.reduce((s, b) => s + b.rating, 0) / burgers.length).toFixed(2) : "0";
  const categories = new Set(burgers.map((b) => b.category)).size;

  const stats = [
    { label: "Total Items", value: burgers.length, icon: UtensilsCrossed },
    { label: "Catalog Value", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign },
    { label: "Avg Rating", value: avgRating, icon: Star },
    { label: "Categories", value: categories, icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-xs text-muted-foreground">Manage your menu items</p>
            </div>
          </div>
          <Button onClick={openAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> Add Burger
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-border/50">
            <h2 className="font-serif text-xl font-semibold text-foreground">Menu Items</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {burgers.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <img src={b.image} alt={b.name} className="w-14 h-14 rounded-lg object-cover" />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{b.category}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm max-w-xs truncate">
                      {b.description}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">${b.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold fill-gold" />
                        <span className="text-sm">{b.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(b)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(b)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {burgers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                      No menu items yet. Click "Add Burger" to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingId !== null ? "Edit Burger" : "Add New Burger"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Beef, Premium, Spicy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              {form.image && (
                <img src={form.image} alt="preview" className="w-full h-32 object-cover rounded-lg mt-2" />
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {editingId !== null ? "Save Changes" : "Add Burger"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
