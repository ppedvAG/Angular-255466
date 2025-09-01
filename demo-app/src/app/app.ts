import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
