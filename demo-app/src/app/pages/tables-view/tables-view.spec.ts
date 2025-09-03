import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesView } from './tables-view';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TablesView', () => {
  let component: TablesView;
  let fixture: ComponentFixture<TablesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablesView],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
