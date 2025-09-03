import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AccountService } from './account-service';

const url = 'wss://ws.postman-echo.com/raw';

export interface ChatMessage {
  sender: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EchoService {
  private readonly subject = webSocket<ChatMessage>(url);
  readonly messages$ = this.subject.asObservable();

  constructor(private accountService: AccountService) {}

  sendMessage(message: string) {
    const sender = this.accountService.currentUser()?.username ?? 'anonymous';

    this.subject.next({
      sender,
      message,
    });
  }
}
