import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUseComponent } from './terms-of-use';

describe('TermsOfUse', () => {
  let component: TermsOfUseComponent;
  let fixture: ComponentFixture<TermsOfUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsOfUseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
