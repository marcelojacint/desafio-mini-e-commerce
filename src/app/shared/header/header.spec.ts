import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../core/services/cart.service';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let cartMock: Partial<CartService>;

  beforeEach(async () => {
    cartMock = { count: () => 5 } as any;
    await TestBed.configureTestingModule({
      imports: [Header, RouterTestingModule],
      providers: [{ provide: CartService, useValue: cartMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart count badge', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
    const badge = compiled.querySelector('a.btn.btn-warning .badge');
    expect(badge?.textContent?.trim()).toBe('5');
  });
});
