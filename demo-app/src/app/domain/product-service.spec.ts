import { TestBed } from '@angular/core/testing';

import { ProductService, url } from './product-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(), // HttpTestingController bereitstellen
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Sicherstellen, dass keine offenen Requests mehr vorhanden sind
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default dishes array', () => {
    expect(service.defaultDishes).toBeDefined();
    expect(service.defaultDishes.length).toBeGreaterThan(0);
    expect(service.defaultDishes.some((d) => d.title === 'Pizza')).toBeTrue();
  });

  it('should perform HTTP GET and map response to dishes', () => {
    const mockApiResponse = {
      recipes: [
        {
          name: 'Test Dish',
          mealType: ['Appetizer'],
          image: 'test-image.svg',
          difficulty: 'easy',
          instructions: ['Step 1', 'Step 2'],
          prepTimeMinutes: 10,
          cookTimeMinutes: 20,
          servings: 1,
        },
      ],
    };

    service.getDishes().subscribe((dishes) => {
      expect(dishes.length).toBe(1);

      const dish = dishes[0];
      expect(dish.title).toBe('Test Dish');
      expect(dish.course).toBe('starters');
      expect(dish.imagePath).toBe('test-image.svg');
      expect(dish.remarks).toBe('easy');
      expect(dish.description).toContain('- Step 1');
      expect(dish.price).toBeCloseTo(5.3);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });
});
