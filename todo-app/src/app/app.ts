import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastListComponent } from './shared/toast-list/toast-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ToastListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo-app');
}
