import { Component, ElementRef } from '@angular/core';
import { Highlight } from './highlight';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<div [appHighlight]="color">Test Content</div>`,
  imports: [Highlight],
})
class TestHighlightComponent {
  color = 'yellow';
}

describe('Highlight', () => {
  let fixture: ComponentFixture<TestHighlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Highlight, TestHighlightComponent],
    });

    fixture = TestBed.createComponent(TestHighlightComponent);
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should highlight background with given color', () => {
    fixture.componentInstance.color = 'red';
    fixture.detectChanges();

    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.style.backgroundColor).toBe('red');
  });

  it('should update highlight color when input changes before ngOnInit', () => {
    fixture.componentInstance.color = 'blue';
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.style.backgroundColor).toBe('blue');
  });
});
