import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list';
import { TaskFormComponent } from './pages/task-form/task-form';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TaskListComponent,
  },
  {
    path: 'new',
    component: TaskFormComponent,
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
