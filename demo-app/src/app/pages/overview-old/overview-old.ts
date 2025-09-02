import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { Rating } from '../../components/rating/rating';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-overview',
  imports: [Rating, Card, CommonModule],
  templateUrl: './overview-old.html',
  styleUrl: '../overview/overview.css',
})
export class OverviewOld {
  status = '';

  readonly dishes: Dish[] = [
    {
      title: 'Pizza',
      course: 'mains',
      price: 8.95,
      imagePath: 'pizza.svg',
      remarks: 'Empfehlung',
    },
    {
      title: 'Pasta',
      course: 'mains',
      price: 10.89,
      imagePath: 'pasta.svg',
    },
    {
      title: 'Salat',
      course: 'starters',
      price: 5.99,
      imagePath: 'salad.svg',
      remarks: 'Angebot',
    },
    {
      title: 'Cupcake',
      course: 'desserts',
      price: 3.99,
      imagePath: 'cake.svg',
    },
  ];

  updateStatus<T>(event: T, type: string) {
    this.status = `${type}: ${JSON.stringify(event)}`;
  }
}
