import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview } from './overview';
import { ProductService } from '../../domain/product-service';
import { of } from 'rxjs';

describe('Overview', () => {
  let component: Overview;
  let fixture: ComponentFixture<Overview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Overview],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getDishes: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Overview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
