import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let cartMock: CartService & { add: ReturnType<typeof vi.fn> };
  let productMock: Partial<ProductService>;

  beforeEach(async () => {
    cartMock = { add: vi.fn() } as any;
    productMock = { getAll: () => of([]) } as Partial<ProductService>;
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: CartService, useValue: cartMock },
        { provide: ProductService, useValue: productMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart', () => {
    const p = { id: 1, name: 'A', price: 10, barcode: '111' } as any;
    component.onAddToCart(p);
    expect(cartMock.add).toHaveBeenCalledWith(p, 1);
  });
});
