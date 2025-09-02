import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Overview } from './components/overview/overview';
import { StatusBar } from './shared/status-bar/status-bar';

registerLocaleData(de);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Overview, StatusBar],
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
