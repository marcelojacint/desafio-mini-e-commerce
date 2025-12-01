import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';


@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe],
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
    const ok = typeof window !== 'undefined' ? window.confirm('Deseja realmente limpar o carrinho?') : true;
    if (ok) {
      this.cart.clear();
    }
  }
}