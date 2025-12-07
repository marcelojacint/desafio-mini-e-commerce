import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category-delete',
  imports: [ReactiveFormsModule],
  templateUrl: './category-delete.html',
  styleUrl: './category-delete.css'
})
export class CategoryDelete {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(CategoryService);

  form = this.fb.nonNullable.group({
    id: [null as number | null, [Validators.required]]
  });

  message = '';

  submit(): void {
    if (this.form.invalid) return;
    const id = Number(this.form.value.id!);
    this.service.delete(id).subscribe({
      next: () => {
        this.message = 'Category deleted successfully.';
      },
      error: () => {
        this.message = 'Error while deleting category.';
      }
    });
  }
}
