import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list';
import { TaskFormComponent } from './pages/task-form/task-form';
import { NotFoundComponent } from './pages/not-found/not-found';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use';
import { termsOfUseGuard } from './guards/terms-of-use-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TaskListComponent,
    canActivate: [termsOfUseGuard],
  },
  {
    path: 'new',
    component: TaskFormComponent,
    canActivate: [termsOfUseGuard],
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent,
    canActivate: [termsOfUseGuard],
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
