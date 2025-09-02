import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, of, Subscription } from 'rxjs';
import { OrderService } from '../../domain/order-service';
import { MessageService } from '../../domain/message-service';
import { Rating } from '../../components/rating/rating';

@Component({
  selector: 'app-tables-view',
  imports: [Rating, CommonModule],
  templateUrl: './tables-view.html',
  styleUrl: './tables-view.css',
})
export class TablesView implements OnInit, OnDestroy {
  // params$ mit leerem Observable initialisieren
  // Observables werden haeufig mit $-Suffix benannt
  private params$ = of({} as Params);

  // Bessere Alternative in Kombination mit async Pipe im Template
  public currentTable$ = of(0);
  // statt in ngOnInit mittels subscribe zu initialisieren
  public currentTable = 0;

  private subscription?: Subscription;

  constructor(
    public orderService: OrderService,
    private messageService: MessageService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.params$ = route.params;
    this.currentTable$ = this.params$.pipe(map((p) => +p['id']));
  }

  ngOnInit() {
    // Eine Subscription von Oberservables hinterlaesst potentiell MemoryLeaks!
    // Deshalb muessen wir die Subscription in OnDestroy abschliessen
    this.subscription = this.currentTable$.subscribe((id) => {
      this.currentTable = id;
    });
  }

  ngOnDestroy(): void {
    // Subscription aufraeumen und Speicher freigeben
    this.subscription?.unsubscribe();

    this.messageService.addMessage('Bye bye TableView!');
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
    this.router.navigate(['/overview']);
  }

  getPrice() {
    return this.orderService.getPriceByTable(this.currentTable);
  }
}
