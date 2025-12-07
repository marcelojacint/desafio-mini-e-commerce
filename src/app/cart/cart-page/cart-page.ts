import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPageComponent {
  private readonly cart = inject(CartService);
  readonly items = computed(() => this.cart.items());
  readonly total = computed(() => this.cart.total());

  remove(id: number): void {
    this.cart.remove(id);
  }

  clear(): void {
    const ok = typeof window !== 'undefined' ? window.confirm('Are you sure you want to clear the cart?') : true;
    if (ok) {
      this.cart.clear();
    }
  }
}
