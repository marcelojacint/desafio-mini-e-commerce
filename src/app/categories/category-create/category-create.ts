import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category-create',
  standalone: true,
  templateUrl: './category-create.html',
  styleUrls: ['./category-create.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CategoryCreate {

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(CategoryService);

  message: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    parentId: [null]
  });

  submit(): void {
    if (this.form.invalid) {
      this.message = 'Please fill all required fields.';
      return;
    }

    const raw = this.form.getRawValue();

    const payload = {
      name: raw.name!,
      parentId: raw.parentId !== null && raw.parentId !== '' 
        ? Number(raw.parentId)
        : null
    };

    this.service.create(payload).subscribe({
      next: () => {
        this.message = 'Category created successfully.';
        this.form.reset({ name: '', parentId: null });
      },
      error: () => {
        this.message = 'Error while creating category.';
      }
    });
  }
}
