import { Routes } from '@angular/router';
import { Overview } from './pages/overview/overview';
import { NotFound } from './pages/not-found/not-found';
import { TablesView } from './pages/tables-view/tables-view';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    component: Overview,
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
