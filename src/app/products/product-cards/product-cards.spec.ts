import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductCards } from './product-cards';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

describe('ProductCards', () => {
  let component: ProductCards;
  let fixture: ComponentFixture<ProductCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCards, HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: { getAll: () => of([]) } },
        { provide: CartService, useValue: { add: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
