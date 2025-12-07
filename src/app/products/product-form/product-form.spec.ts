import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductForm } from './product-form';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';

describe('ProductForm', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductForm, HttpClientTestingModule],
      providers: [
        { provide: CategoryService, useValue: { getAll: () => of([]) } },
        { provide: ProductService, useValue: { create: () => of({ id: 1 }) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show error message when form is invalid', () => {
    component.form.reset({ name: '', price: 0, barcode: '', categoryId: null });
    component.save();
    expect(component.message).toBe('Please fill all required fields.');
  });
  it('should set success message and reset after save', () => {
    component.form.setValue({ name: 'X', price: 10, barcode: 'ABC', categoryId: null });
    component.form.get('categoryId')!.setValue(1 as any);
    component.save();
    expect(component.message).toBe('Product created successfully.');
    const v = component.form.getRawValue();
    expect(v.name).toBe('');
    expect(v.price).toBe(0);
    expect(v.barcode).toBe('');
    expect(v.categoryId).toBeNull();
  });
});
