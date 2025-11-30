export interface Product {
  id: number;
  name: string;
  price: number;
  barcode: string;
  category?: Category;
  seller?: User;
}

export interface Category {
  id: number;
  name: string;
  parent?: Category | null;
  children?: Category[];
}

export interface User {
  id?: number;
  username?: string;
}
