import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../core/services/cart.service';
import { vi } from 'vitest';

import { CartPageComponent } from './cart-page';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let cartMock: CartService & { remove: ReturnType<typeof vi.fn>; clear: ReturnType<typeof vi.fn>; items: ReturnType<typeof vi.fn>; total: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    cartMock = {
      remove: vi.fn(),
      clear: vi.fn(),
      items: vi.fn().mockReturnValue([]),
      total: vi.fn().mockReturnValue(0)
    } as any;
    await TestBed.configureTestingModule({
      imports: [CartPageComponent, RouterTestingModule],
      providers: [{ provide: CartService, useValue: cartMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove on service', () => {
    component.remove(123);
    expect(cartMock.remove).toHaveBeenCalledWith(123);
  });

  it('should clear cart when user confirms', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true as any);
    component.clear();
    expect(cartMock.clear).toHaveBeenCalled();
  });

  it('should not clear cart when user cancels', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false as any);
    component.clear();
    expect(cartMock.clear).not.toHaveBeenCalled();
  });
});
