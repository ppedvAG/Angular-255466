import { Component } from '@angular/core';
import { TaskService } from '../../domain/task-service';
import { TaskItemComponent } from '../../components/task-item/task-item';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskItemComponent],
})
export class TaskListComponent {
  constructor(public taskService: TaskService) {}
}
