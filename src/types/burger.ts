export interface Categories {
  id: string;
  name: string;
}

export interface Items {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: Categories;
}

export interface CartItem extends Items {
  quantity: number;
}
