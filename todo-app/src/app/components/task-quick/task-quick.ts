import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from '../../../lib/models/task-item';
import { TaskRemoteService } from '../../domain/task-remote.service';
import { ToastService } from '../../domain/toast-service';

@Component({
  selector: 'app-task-quick',
  imports: [FormsModule],
  templateUrl: './task-quick.html',
  styleUrl: './task-quick.css',
})
export class TaskQuickComponent {
  @Input() task: TaskItem = <TaskItem>{};

  editing = false;

  constructor(private taskService: TaskRemoteService, private toastService: ToastService) {}

  get creating() {
    return !this.task.id;
  }

  submit() {
    if (this.task.title) {
      if (this.creating) {
        this.taskService.addTask(this.task);
        this.toastService.sendInfo(`"${this.task.title}" wurde erstellt`);
        this.task = <TaskItem>{};
      } else {
        this.taskService.updateTask(this.task.id!, this.task);
        this.toastService.sendInfo(`"${this.task.title}" wurde gespeichert`);
      }
      this.editing = false;
    }
  }
}
