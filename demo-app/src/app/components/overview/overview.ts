import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Rating } from '../rating/rating';
import { Card, OrderEventArg } from '../card/card';
import { ProductService } from '../../domain/product-service';
import { OrderService } from '../../domain/order-service';
import { Dish } from '../../models/dish.model';
import { MessageService } from '../../domain/message-service';
import { TablesView } from '../tables-view/tables-view';

@Component({
  selector: 'app-overview',
  imports: [Rating, Card, CommonModule, TablesView],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  // mit private, public oder protected als Keywords
  // wird implizit das Backingfield angelegt und sparen
  // uns die Deklaration sowie die Initialisierung
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  get dishes() {
    return this.productService.getDishes();
  }

  addOrder(args: OrderEventArg) {
    this.orderService.addOrder(args.tableNo, args.dish);
    this.messageService.addMessage(`${args.dish.title} an Tisch ${args.tableNo} bestellt!`);
  }
}
