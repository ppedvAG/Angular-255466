import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Overview } from './components/overview/overview';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Overview],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Field
  title = 'demo-app';

  // Signal
  protected readonly titleFunc = signal('demo-app');

  // Property
  get titleProp() {
    return this.title;
  }
}
