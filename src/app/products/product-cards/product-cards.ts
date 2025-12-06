import { Component, inject } from '@angular/core';
import { NgFor, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-product-cards',
  imports: [NgFor, CurrencyPipe],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css'
})
export class ProductCards {
  private readonly service = inject(ProductService);
  private readonly cart = inject(CartService);

  products: Product[] = [];

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (res) => {
        this.products = res;
      }
    });
  }

  addToCart(p: Product): void {
    this.cart.add(p, 1);
  }

  trackById(_: number, p: Product): number { return p.id; }
}