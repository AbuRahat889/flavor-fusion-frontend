export interface Burger {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

export interface CartItem extends Burger {
  quantity: number;
}
