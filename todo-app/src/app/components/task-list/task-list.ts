import { Component } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item';
import { TaskService } from '../../domain/task-service';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskItemComponent, TaskFormComponent],
})
export class TaskListComponent {
  constructor(public taskService: TaskService) {}
}
