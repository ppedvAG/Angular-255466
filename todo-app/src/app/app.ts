import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { ToastListComponent } from './shared/toast-list/toast-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskListComponent, ToastListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo-app');
}
