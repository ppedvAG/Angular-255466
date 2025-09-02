import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight implements OnInit {
  // @Input('appHighlight') color = 'transparent';
  color = input('transparent', { alias: 'appHighlight' });

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = this.color();
  }
}
