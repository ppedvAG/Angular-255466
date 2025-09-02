import { Component, computed, input, output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Dish } from '../../models/dish.model';
import { MarkedPipe } from '../../pipes/marked-pipe';
import { SanitizePipe } from '../../pipes/sanitize-pipe';
import { Highlight } from '../../directive/highlight';

export type OrderEventArg = { dish: Dish; tableNo: number };

@Component({
  selector: 'app-card',
  imports: [NgClass, CommonModule, MarkedPipe, SanitizePipe, Highlight],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  // Hier verwenden wir die neuen Angular signals statt die herkoemmlichen Decorators @Input und @Output
  // Dabei ist zu beachten, dass wir title wie eine function aufruefen muessen
  dish = input({} as Dish);
  title = computed(() => this.dish().title);
  price = computed(() => this.dish().price);

  ordered = output<OrderEventArg>();

  order(tableNo: number) {
    this.ordered.emit({
      dish: this.dish(),
      tableNo,
    });
  }
}
