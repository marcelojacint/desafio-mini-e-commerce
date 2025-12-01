import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  
   getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/categories';

  create(dto: { name: string; parentId?: number | null }): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

 
}
