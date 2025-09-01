import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  // Hier verwenden wir die neuen Angular signals statt die herkoemmlichen Decorators @Input und @Output
  // Dabei ist zu beachten, dass wir title wie eine function aufruefen muessen
  title = input<string>('');
  price = input<number>(0);
  ordered = output<{}>();

  order() {
    this.ordered.emit({
      title: this.title(),
    });
  }
}
