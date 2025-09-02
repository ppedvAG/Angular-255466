import { Component, ElementRef, viewChild } from '@angular/core';
import { TaskService } from '../../domain/task-service';
import { ToastService } from '../../domain/toast-service';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent {
  formRef = viewChild<ElementRef<HTMLFormElement>>('formRef');

  get valid() {
    return this.formRef()?.nativeElement.checkValidity();
  }

  constructor(private taskService: TaskService, private toastService: ToastService) {}

  addTask(e: Event, title: string, dueDate: Date | null = null) {
    e.preventDefault();

    if (!this.valid) {
      this.toastService.sendError('Bitte geben Sie den Titel der Aufgabe ein.');
    } else {
      this.taskService.addTask({
        title,
        dueDate: dueDate ?? undefined,
        priority: 'default',
      });

      const list = this.taskService.items();
      this.toastService.sendInfo(`${list.length} Aufgaben insgesamt`);

      this.formRef()?.nativeElement.reset();
    }
  }
}
