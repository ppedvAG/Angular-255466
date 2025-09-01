import { Component } from '@angular/core';
import { Rating } from '../rating/rating';
import { Card } from '../card/card';

@Component({
  selector: 'app-overview',
  imports: [Rating, Card],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  status = '';

  updateStatus<T>(event: T, type: string) {
    this.status = `${type}: ${JSON.stringify(event)}`;
  }
}
