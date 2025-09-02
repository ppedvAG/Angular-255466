import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../domain/account-service';
import { lastValueFrom } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(AccountService);

  // return Boolean(service.currentUser());
  // Kurzschreibweise
  return !!service.currentUser();
};

// Problem bei diesem Ansatz: wert kommt ein Zyklus zu speat
export const loginGuardAsync: CanActivateFn = async (route, state) => {
  const service = inject(AccountService);
  const user = await lastValueFrom(service.currentUser$);
  console.log('user in guard', user);
  return Boolean(user);
};
