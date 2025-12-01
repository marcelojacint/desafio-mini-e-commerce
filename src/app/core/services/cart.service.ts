import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'mini_cart_items_v1';
  readonly items = signal<CartItem[]>(this.load());

  readonly count = signal<number>(this.items().reduce((acc, i) => acc + i.quantity, 0));

  add(product: Product, quantity = 1): void {
    if (quantity < 1) return;
    const list = [...this.items()];
    const found = list.find((i) => i.product.id === product.id);
    if (found) {
      found.quantity += quantity;
    } else {
      list.push({ product, quantity });
    }
    this.items.set(list);
    this.persist();
    this.updateCount();
  }

  remove(productId: number): void {
    const list = this.items().filter((i) => i.product.id !== productId);
    this.items.set(list);
    this.persist();
    this.updateCount();
  }

  clear(): void {
    this.items.set([]);
    this.persist();
    this.updateCount();
  }

  total(): number {
    return this.items().reduce((acc, i) => acc + Math.max(0, i.product.price) * i.quantity, 0);
  }

  private persist(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
  }

  private load(): CartItem[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as CartItem[];
      return parsed.map((i) => ({ product: i.product, quantity: Math.max(1, i.quantity) }));
    } catch {
      return [];
    }
  }

  private updateCount(): void {
    this.count.set(this.items().reduce((acc, i) => acc + i.quantity, 0));
  }
}