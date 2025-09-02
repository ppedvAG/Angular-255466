import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../domain/account-service';
import { Credentials } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  error = '';

  constructor(private accountService: AccountService, private router: Router) {}

  login() {
    if (this.accountService.login({} as Credentials)) {
      this.router.navigate(['overview']);
    } else {
      this.error = 'Login fehlgeschlagen';
    }
  }

  loginAsGuest() {
    this.accountService.loginAsGuest();
    this.router.navigate(['overview']);
  }
}
