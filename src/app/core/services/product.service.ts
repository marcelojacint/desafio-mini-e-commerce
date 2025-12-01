import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/products';

  
  create(product: { name: string; price: number; barcode: string; categoryId: number }): Observable<Product> {
    const payload: Partial<Product> = {
      name: product.name,
      price: product.price,
      barcode: product.barcode,
      category: { id: product.categoryId } as Category
    };
    return this.http.post<Product>(this.baseUrl, payload);
  }

  
}