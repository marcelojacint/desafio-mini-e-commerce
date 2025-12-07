import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-product-update',
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './product-update.html',
  styleUrls: ['./product-update.css']
})
export class ProductUpdateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  message: string | null = null;

  form = this.fb.nonNullable.group({
    id: [null as number | null, [Validators.required]],
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    barcode: ['', Validators.required],
    categoryId: [null as number | null, Validators.required]
  });

  categories: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (cats) => {
        this.categories = cats.map(c => ({ id: c.id, name: c.name }));
      }
    });
  }

  loadProduct(): void {
    const id = this.form.value.id;
    if (!id) return;
    this.productService.getById(Number(id)).subscribe({
      next: (p) => {
        this.form.patchValue({
          name: p.name,
          price: p.price,
          barcode: p.barcode,
          categoryId: p.category?.id ?? null
        });
        this.message = null;
      },
      error: () => {
        this.message = 'Product not found.';
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.message = 'Please fill all required fields.';
      return;
    }

    const raw = this.form.getRawValue();

    const payload = {
      id: Number(raw.id!),
      name: raw.name!,
      price: raw.price!,
      barcode: raw.barcode!,
      categoryId: Number(raw.categoryId!)
    };

    this.productService.update(payload).subscribe({
      next: () => {
        this.message = 'Product updated successfully.';
      },
      error: () => {
        this.message = 'Error while updating product.';
      }
    });
  }
}

