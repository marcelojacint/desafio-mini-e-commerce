import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError, of } from 'rxjs';
import { ProductUpdateComponent } from './product-update';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUpdateComponent, HttpClientTestingModule],
      providers: [
        { provide: CategoryService, useValue: { getAll: () => of([]) } },
        { provide: ProductService, useValue: { getById: () => throwError(() => new Error('404')) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should set "Product not found." message on getById error', () => {
    component.form.patchValue({ id: 123 });
    component.loadProduct();
    expect(component.message).toBe('Product not found.');
  });
});

