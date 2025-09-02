import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskItem } from '../../../lib/models/task-item';
import { TaskService } from '../../domain/task-service';
import { RelativeDatePipe } from '../../pipes/relative-date-pipe';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, RelativeDatePipe],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItemComponent {
  @Input() item = { title: 'Nicht angegeben' } as TaskItem;

  constructor(private taskService: TaskService) {}

  setCompleted(completed: boolean) {
    this.taskService.updateTask(this.item.id, { completed });
  }

  deleteTask(id: string) {
    this.taskService.removeTask(id);
  }
}
