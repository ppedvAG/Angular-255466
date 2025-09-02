import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly dishes: Dish[] = [
    {
      title: 'Pizza',
      course: 'mains',
      price: 8.95,
      imagePath: 'pizza.svg',
      remarks: 'Empfehlung',
      description: '**Pizza** mit Kaese, Salami, Schinken und Oliven',
    },
    {
      title: 'Pasta',
      course: 'mains',
      price: 10.89,
      imagePath: 'pasta.svg',
      description: 'Salat mit Kartoffeln, Zwiebeln, Karotten und `Pommes Frites`',
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

  getDishes() {
    // Kopie des Arrays erstellen mit spread operator und erneute Kapselung im Array
    return [...this.dishes];
  }
}
