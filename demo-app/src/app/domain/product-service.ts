import { Injectable } from '@angular/core';
import { Course, Dish } from '../models/dish.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MealType, Recipe } from '../models/recipe.model';

export const url = 'https://dummyjson.com/recipes?limit=8&skip=0';

function toCourse(type: MealType[]): Course {
  if (type.includes('Side Dish')) {
    return 'sides';
  }
  if (type.includes('Dessert')) {
    return 'desserts';
  }
  if (type.includes('Appetizer')) {
    return 'starters';
  }
  return 'mains';
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly defaultDishes: Dish[] = [
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

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    // Kopie des Arrays erstellen mit spread operator und erneute Kapselung im Array
    // return [...this.dishes];

    return this.http
      .get<{ recipes: Recipe[] }>(url)
      .pipe(map((response) => response.recipes.map(this.toDish)));
  }

  private toDish(recipe: Recipe): Dish {
    const price =
      recipe.prepTimeMinutes * 0.1 + recipe.cookTimeMinutes * 0.2 + recipe.servings * 0.3;

    return {
      title: recipe.name,
      course: toCourse(recipe.mealType),
      imagePath: recipe.image,
      remarks: recipe.difficulty,
      description: recipe.instructions.map((s) => `- ${s}`).join('\n'),
      price,
    };
  }
}
