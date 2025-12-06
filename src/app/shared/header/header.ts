import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly cart = inject(CartService);
  readonly count = this.cart.count;
}
