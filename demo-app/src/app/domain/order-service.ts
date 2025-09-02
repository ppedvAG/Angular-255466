import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Dish } from '../models/dish.model';

type DishInfo = ReturnType<typeof distinctAndCount>;

function distinctAndCount<T>(acc: [T, number][], item: T) {
  const existing = acc.find(([name]) => name === item);
  if (existing) {
    existing[1]++;
  } else {
    acc.push([item, 1]);
  }
  return acc;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [];

  // Welche Tische sind besetzt?
  get tables(): number[] {
    return Object.keys(this.orders).map(Number);
  }

  getByTable(tableNo: number) {
    return this.orders[tableNo]?.items ?? [];
  }

  getTitlesByTable(tableNo: number): DishInfo {
    return this.getByTable(tableNo)
      .map((item) => item.title)
      .reduce(distinctAndCount, [] as DishInfo);
  }

  getPriceByTable(currentTable: number) {
    return this.getByTable(currentTable).reduce((acc, item) => acc + item.price, 0);
  }

  addOrder(tableNo: number, dish: Dish) {
    if (this.orders[tableNo]) {
      this.orders[tableNo].items.push(dish);
    } else {
      this.orders[tableNo] = {
        items: [dish],
        date: new Date(),
      };
    }
  }

  removeOrder(tableNo: number) {
    if (this.orders[tableNo]) {
      delete this.orders[tableNo];
    }
  }
}
