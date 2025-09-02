import { Component } from '@angular/core';
import { ToastService } from '../../domain/toast-service';
import { StatusElementComponent } from '../status-element/status-element';

@Component({
  selector: 'app-toast-list',
  imports: [StatusElementComponent],
  templateUrl: './toast-list.html',
  styleUrl: './toast-list.css',
})
export class ToastListComponent {
  constructor(public service: ToastService) {}
}
