import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET all products', () => {
    const mock: Product[] = [
      { id: 1, name: 'A', price: 10, barcode: '111', category: { id: 1, name: 'Cat' } },
      { id: 2, name: 'B', price: 20, barcode: '222', category: { id: 2, name: 'Cat2' } }
    ];

    let result: Product[] | undefined;
    service.getAll().subscribe(r => (result = r));

    const req = httpMock.expectOne('http://localhost:8080/products');
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    expect(result).toEqual(mock);
  });

  it('should GET product by id', () => {
    const mock: Product = { id: 42, name: 'X', price: 99.9, barcode: 'XYZ', category: { id: 3, name: 'C' } };

    let result: Product | undefined;
    service.getById(42).subscribe(r => (result = r));

    const req = httpMock.expectOne('http://localhost:8080/products/42');
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    expect(result).toEqual(mock);
  });

  it('should POST to create product with category id payload', () => {
    const input = { name: 'New', price: 12.5, barcode: 'ABC', categoryId: 7 };

    let result: Product | undefined;
    service.create(input).subscribe(r => (result = r));

    const req = httpMock.expectOne('http://localhost:8080/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'New',
      price: 12.5,
      barcode: 'ABC',
      category: { id: 7 }
    });
    req.flush({ id: 10, name: 'New', price: 12.5, barcode: 'ABC', category: { id: 7, name: '' } });

    expect(result?.id).toBe(10);
  });

  it('should PUT to update product to baseUrl with id in body', () => {
    const input = { id: 10, name: 'Updated', price: 15, barcode: 'ABC', categoryId: 7 };

    let result: Product | null | undefined;
    service.update(input).subscribe(r => (result = r));

    const req = httpMock.expectOne('http://localhost:8080/products');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      id: 10,
      name: 'Updated',
      price: 15,
      barcode: 'ABC',
      category: { id: 7 }
    });
    req.flush({ id: 10, name: 'Updated', price: 15, barcode: 'ABC', category: { id: 7, name: '' } });

    expect(result?.id).toBe(10);
  });

  it('should DELETE product by id', () => {
    let done = false;
    service.delete(33).subscribe(() => (done = true));

    const req = httpMock.expectOne('http://localhost:8080/products/33');
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(done).toBe(true);
  });
});
