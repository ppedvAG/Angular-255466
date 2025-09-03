import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Signal, signal } from '@angular/core';
import { ProductService } from '../../domain/product-service';
import { OrderService } from '../../domain/order-service';
import { MessageService } from '../../domain/message-service';
import { Card, OrderEventArg } from '../../components/card/card';
import { BehaviorSubject, startWith, Subscription } from 'rxjs';
import { Dish } from '../../models/dish.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, Card],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnDestroy {
  // Wir muessen das Observable<Dish[]> vom Service entkoppeln
  private readonly dishSubject = new BehaviorSubject<Dish[]>([]);
  readonly dishes$ = this.dishSubject.asObservable();
  private subscription?: Subscription;

  // Alternative als Signals -- Subscription nicht mehr notwendig
  readonly dishes: Signal<Dish[] | undefined>;

  // mit private, public oder protected als Keywords
  // wird implizit das Backingfield angelegt und sparen
  // uns die Deklaration sowie die Initialisierung
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.subscription = this.productService
      .getDishes()
      .pipe(startWith(this.productService.defaultDishes))
      .subscribe((dishes) => this.dishSubject.next(dishes));
    this.dishes = toSignal(this.dishSubject);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addOrder(args: OrderEventArg) {
    this.orderService.addOrder(args.tableNo, args.dish);
    this.messageService.addMessage(`${args.dish.title} an Tisch ${args.tableNo} bestellt!`);
  }
}
