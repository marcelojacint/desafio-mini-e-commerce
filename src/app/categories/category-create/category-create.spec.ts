import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { CategoryCreate } from './category-create';
import { CategoryService } from '../../core/services/category.service';

describe('CategoryCreate', () => {
  let component: CategoryCreate;
  let fixture: ComponentFixture<CategoryCreate>;
  let svcMock: CategoryService & { create: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    svcMock = { create: vi.fn() } as any;
    await TestBed.configureTestingModule({
      imports: [CategoryCreate],
      providers: [{ provide: CategoryService, useValue: svcMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message when form is invalid', () => {
    component.form.reset({ name: '', parentId: null });
    component.submit();
    expect(component.message).toBe('Please fill all required fields.');
  });

  it('should set success message and reset after submit', () => {
    (svcMock.create as any).mockReturnValue(of({ id: 1 } as any));
    component.form.setValue({ name: 'X', parentId: null });
    component.submit();
    expect(component.message).toBe('Category created successfully.');
    const v = component.form.getRawValue();
    expect(v.name).toBe('');
    expect(v.parentId).toBeNull();
  });

  it('should set error message on service error', () => {
    (svcMock.create as any).mockReturnValue(throwError(() => new Error('fail')));
    component.form.setValue({ name: 'X', parentId: null });
    component.submit();
    expect(component.message).toBe('Error while creating category.');
  });
});
