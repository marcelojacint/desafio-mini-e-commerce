import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm {

  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  message: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    barcode: ['', Validators.required],
    categoryId: [null, Validators.required]
  });

  categories: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (cats) => {
        this.categories = cats.map(c => ({ id: c.id, name: c.name }));
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
      name: raw.name!,
      price: raw.price!,
      barcode: raw.barcode!,
      categoryId: raw.categoryId!
    };

    this.productService.create(payload).subscribe({
      next: () => {
        this.message = 'Product created successfully.';
        this.form.reset({
          name: '',
          price: 0,
          barcode: '',
          categoryId: null
        });
      },
      error: () => {
        this.message = 'Error while creating product.';
      }
    });
  }
}
