import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../domain/account-service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, FormsModule],
      providers: [
        Router,
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login as guest', () => {
    component.loginAsGuest();
    const service = TestBed.inject(AccountService);
    expect(service.currentUser()?.username).toEqual('guest');
  });
});
