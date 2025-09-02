import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MessageType } from '../../../lib/models/toast-message';

@Component({
  selector: 'app-status-element',
  imports: [CommonModule],
  templateUrl: './status-element.html',
  styleUrl: './status-element.css',
})
export class StatusElementComponent {
  type = input<MessageType>('info');
}
