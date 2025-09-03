import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskItem } from '../../../lib/models/task-item';
import { TaskRemoteService } from '../../domain/task-remote.service';
import { RelativeDatePipe } from '../../pipes/relative-date-pipe';
import { TaskQuickComponent } from '../task-quick/task-quick';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, TaskQuickComponent, RelativeDatePipe],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItemComponent {
  @Input() item = { title: 'Nicht angegeben' } as TaskItem;

  constructor(private taskService: TaskRemoteService, private router: Router) {}

  editTask(id: string) {
    this.router.navigate(['/edit', id]);
  }

  setCompleted(completed: boolean) {
    this.taskService.updateTask(this.item.id, { completed });
  }

  deleteTask(id: string) {
    this.taskService.removeTask(id);
  }
}
