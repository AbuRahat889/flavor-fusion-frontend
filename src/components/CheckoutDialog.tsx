import { useState } from "react";
import { CreditCard, Wallet, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { toast } from "sonner";

type PaymentMethod = "card" | "cod";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [orderId, setOrderId] = useState("");

  const deliveryFee = 2.99;
  const grandTotal = totalPrice + deliveryFee;

  const resetAndClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("form");
      setName("");
      setPhone("");
      setAddress("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setMethod("card");
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (method === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      if (digits.length < 12 || !/^\d+$/.test(digits)) {
        toast.error("Enter a valid card number");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        toast.error("Expiry must be MM/YY");
        return;
      }
      if (!/^\d{3,4}$/.test(cardCvc)) {
        toast.error("Invalid CVC");
        return;
      }
    }

    setStep("processing");

    setTimeout(() => {
      const order = addOrder({
        customer: name,
        items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
        total: grandTotal,
      });
      setOrderId(order.id);
      clearCart();
      setStep("success");
      toast.success(
        method === "card" ? "Payment successful!" : "Order placed! Pay on delivery."
      );
    }, 1500);
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? resetAndClose() : onOpenChange(o))}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {step === "success" ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">Order Confirmed!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Order <span className="font-mono text-foreground">{orderId}</span> has been placed.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {method === "cod"
                  ? "Please keep cash ready for the delivery."
                  : "Your payment was processed successfully."}
              </p>
            </div>
            <Button onClick={resetAndClose} className="w-full">
              Done
            </Button>
          </div>
        ) : step === "processing" ? (
          <div className="text-center py-10 space-y-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">
              {method === "card" ? "Processing payment..." : "Placing order..."}
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif">Checkout</DialogTitle>
              <DialogDescription>Complete your order details below.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={2}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={method}
                  onValueChange={(v) => setMethod(v as PaymentMethod)}
                  className="grid grid-cols-2 gap-2"
                >
                  <label
                    className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                      method === "card" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="card" id="pm-card" />
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm font-medium">Card</span>
                  </label>
                  <label
                    className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                      method === "cod" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="cod" id="pm-cod" />
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-medium">Cash on Delivery</span>
                  </label>
                </RadioGroup>
              </div>

              {method === "card" && (
                <div className="space-y-3 p-3 rounded-md bg-muted/30 border border-border">
                  <div className="space-y-2">
                    <Label htmlFor="card">Card Number</Label>
                    <Input
                      id="card"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      inputMode="numeric"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="exp">Expiry</Label>
                      <Input
                        id="exp"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                          if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                          setCardExpiry(v);
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-1">
                  <span>Total</span>
                  <span className="text-primary text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {method === "card" ? `Pay $${grandTotal.toFixed(2)}` : "Place Order"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
