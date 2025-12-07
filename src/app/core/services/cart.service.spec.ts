import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product';

describe('CartService', () => {
  let service: CartService;

  const p1: Product = { id: 1, name: 'A', price: 10, barcode: '111' };
  const p2: Product = { id: 2, name: 'B', price: 5, barcode: '222' };

  beforeEach(() => {
    // reset storage
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.clear();
  });

  it('add should insert and merge quantities, updating count', () => {
    service.add(p1, 1);
    expect(service.items().length).toBe(1);
    expect(service.count()).toBe(1);

    service.add(p1, 2);
    expect(service.items()[0].quantity).toBe(3);
    expect(service.count()).toBe(3);

    service.add(p2, 1);
    expect(service.items().length).toBe(2);
    expect(service.count()).toBe(4);
  });

  it('remove should filter item and update count', () => {
    service.add(p1, 2);
    service.add(p2, 1);
    expect(service.count()).toBe(3);

    service.remove(p1.id);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].product.id).toBe(p2.id);
    expect(service.count()).toBe(1);
  });

  it('clear should empty cart and set count to zero', () => {
    service.add(p1, 2);
    service.add(p2, 3);
    expect(service.items().length).toBe(2);
    expect(service.count()).toBe(5);

    service.clear();
    expect(service.items().length).toBe(0);
    expect(service.count()).toBe(0);
  });

  it('total should sum with non-negative prices only', () => {
    const neg: Product = { id: 3, name: 'C', price: -100, barcode: '333' };
    service.add(p1, 2); // 20
    service.add(p2, 3); // 15
    service.add(neg, 1); // 0 due to Math.max(0, price)
    expect(service.total()).toBe(35);
  });

  it('persist should write to localStorage and load should restore with min quantity 1', () => {
    service.add(p1, 0); // ignored
    service.add(p1, 1);
    service.add(p2, 2);

    const key = 'mini_cart_items_v1';
    const raw = localStorage.getItem(key);
    expect(raw).toBeTruthy();

    // tamper storage with zero quantity and ensure load fixes it to 1
    const tampered = JSON.stringify([{ product: p1, quantity: 0 }]);
    localStorage.setItem(key, tampered);

    const fresh = new CartService();
    expect(fresh.items()[0].quantity).toBe(1);
  });
});

