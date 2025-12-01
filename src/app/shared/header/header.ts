import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
count() {
throw new Error('Method not implemented.');
}
}