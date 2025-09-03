import { Component } from '@angular/core';
import { TaskService } from '../../domain/task-service';
import { TaskItemComponent } from '../../components/task-item/task-item';
import { TaskQuickComponent } from '../../components/task-quick/task-quick';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskItemComponent, TaskQuickComponent],
})
export class TaskListComponent {
  constructor(public taskService: TaskService) {}
}
