import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-delete',
  imports: [ReactiveFormsModule],
  templateUrl: './product-delete.html',
  styleUrl: './product-delete.css'
})
export class ProductDelete {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ProductService);

  form = this.fb.nonNullable.group({
    id: [null as number | null, [Validators.required]]
  });

  message = '';

  submit(): void {
    if (this.form.invalid) return;
    const id = Number(this.form.value.id!);
    this.service.delete(id).subscribe({
      next: () => {
        this.message = 'Product deleted successfully.';
      },
      error: () => {
        this.message = 'Error while deleting product.';
      }
    });
  }
}
