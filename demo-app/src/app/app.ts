import { CommonModule, registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StatusBar } from './shared/status-bar/status-bar';
import { OrderService } from './domain/order-service';
import { AccountService } from './domain/account-service';

registerLocaleData(de);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StatusBar, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Field
  title = 'demo-app';

  constructor(public orderService: OrderService, public accountService: AccountService) {}

  // Signal
  protected readonly titleFunc = signal('demo-app');

  // Property
  get titleProp() {
    return this.title;
  }
}
