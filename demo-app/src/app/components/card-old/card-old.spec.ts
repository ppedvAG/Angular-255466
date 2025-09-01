import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOld } from './card-old';

describe('CardOld', () => {
  let component: CardOld;
  let fixture: ComponentFixture<CardOld>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOld]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOld);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
