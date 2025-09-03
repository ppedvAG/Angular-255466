import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { EchoService } from '../../domain/echo-service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  echo$: Observable<string>;
  message = model('');

  constructor(private echoService: EchoService) {
    this.echo$ = echoService.messages$.pipe(
      map((message) => `${message.sender}: ${message.message}`)
    );
  }

  sendMessage() {
    this.echoService.sendMessage(this.message());
    this.message.set('');
  }
}
