import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusElement } from './status-element';

describe('StatusElement', () => {
  let component: StatusElement;
  let fixture: ComponentFixture<StatusElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusElement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusElement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
