import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../domain/account-service';
import { Credentials } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    // sog. template driven forms
    FormsModule, // fuer ngModel erforderlich
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials: Credentials = {
    username: '',
    password: '',
  };
  error = '';

  constructor(private accountService: AccountService, private router: Router) {}

  login() {
    if (this.accountService.login(this.credentials)) {
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
