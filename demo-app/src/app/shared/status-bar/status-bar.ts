import { Component } from '@angular/core';
import { MessageService } from '../../domain/message-service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.css',
})
export class StatusBar {
  constructor(public service: MessageService) {}
}
