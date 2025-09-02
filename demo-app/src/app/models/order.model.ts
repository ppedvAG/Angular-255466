import { Dish } from './dish.model';

export interface Order {
  items: Dish[];
  date: Date;
}
