import { Component, computed, EventEmitter, Input, input, Output, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Dish } from '../../models/dish.model';

export type OrderEventArg = { dish: Dish; tableNo: number };

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card-old.html',
  styleUrl: './card-old.css',
})
export class CardOld {
  // Hier verwenden wir die neuen Angular signals statt die herkoemmlichen Decorators @Input und @Output
  // Dabei ist zu beachten, dass wir title wie eine function aufruefen muessen
  @Input({ required: true }) dish = {} as Dish;

  @Output() ordered = new EventEmitter<OrderEventArg>();

  order(tableNo: number) {
    this.ordered.emit({
      dish: this.dish,
      tableNo,
    });
  }
}
