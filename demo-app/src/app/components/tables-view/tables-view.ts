import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../domain/order-service';
import { MessageService } from '../../domain/message-service';
import { Rating } from '../rating/rating';

@Component({
  selector: 'app-tables-view',
  imports: [Rating, CommonModule],
  templateUrl: './tables-view.html',
  styleUrl: './tables-view.css',
})
export class TablesView {
  currentTable = 0;

  constructor(public orderService: OrderService, private messageService: MessageService) {}

  setTable(tableNo: number) {
    this.currentTable = tableNo;
  }

  getTitles() {
    return this.orderService
      .getTitlesByTable(this.currentTable)
      .map(([title, count]) => `${title} (${count})`);
  }

  getOrderDate() {
    return this.orderService.getOrderDateByTable(this.currentTable);
  }

  updateStatus<T>($event: T, type: string) {
    this.messageService.addMessage(`${type}: ${JSON.stringify($event)}`);
  }

  payBill() {
    this.orderService.removeOrder(this.currentTable);
  }
  getPrice() {
    return this.orderService.getPriceByTable(this.currentTable);
  }
}
