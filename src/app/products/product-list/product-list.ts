import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';

import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  private readonly service = inject(ProductService);
  private readonly cart = inject(CartService);

  products: Product[] = [];
  loading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onAddToCart(p: Product): void {
    this.cart.add(p, 1);
  }
}
