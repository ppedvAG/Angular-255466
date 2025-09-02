import { Routes } from '@angular/router';
import { Overview } from './pages/overview/overview';
import { NotFound } from './pages/not-found/not-found';
import { TablesView } from './pages/tables-view/tables-view';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { loginGuard, loginGuardAsync } from './guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    component: Overview,
    canActivate: [loginGuard],
  },
  {
    path: 'tables/:id',
    component: TablesView,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '**',
    component: NotFound,
  },
];
