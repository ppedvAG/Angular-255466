import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../domain/product-service';
import { OrderService } from '../../domain/order-service';
import { MessageService } from '../../domain/message-service';
import { Card, OrderEventArg } from '../../components/card/card';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, Card],
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
