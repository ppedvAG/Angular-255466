import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Credentials } from '../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

const guest = {
  username: 'guest',
  password: '',
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly currentUserSubject = new Subject<Credentials | null>();
  readonly currentUser$ = this.currentUserSubject.asObservable();
  readonly currentUser = toSignal(this.currentUser$);

  readonly loggedIn$: Observable<boolean> = this.currentUser$.pipe(map((user) => !!user));

  readonly currentUserName$ = this.currentUser$.pipe(
    map((user) => user?.username),
    tap(console.log) // jedes mal wenn currentUserSubject sich aendert
  );

  registeredUsers: Credentials[] = [guest];

  login(credentials: Credentials): boolean {
    const matchUser = (user: Credentials) =>
      user.username === credentials.username && user.password === credentials.password;

    if (this.registeredUsers.find(matchUser)) {
      this.currentUserSubject.next(credentials);
      return true;
    }

    return false;
  }

  loginAsGuest() {
    return this.login(guest);
  }

  register(user: Credentials) {
    this.registeredUsers.push(user);
    this.login(user);
  }
}
