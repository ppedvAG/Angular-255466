import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItem } from '../../../lib/models/task-item';
import { TaskService } from '../../domain/task-service';
import { ToastService } from '../../domain/toast-service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent implements OnInit {
  formRef = viewChild<ElementRef<HTMLFormElement>>('formRef');

  currentTask = <TaskItem>{};

  get valid() {
    return this.formRef()?.nativeElement.checkValidity();
  }

  get id(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  get editing(): boolean {
    return Boolean(this.id);
  }

  constructor(
    private taskService: TaskService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.id) {
      const task = this.taskService.getTask(this.id);
      if (task) {
        this.currentTask = task;
      }
    }
  }

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

      this.router.navigate(['/list']);
    }
  }

  updateTask(e: Event, title: string, dueDate: Date | null = null) {
    e.preventDefault();

    this.taskService.updateTask(this.id!, {
      title,
      dueDate: dueDate ?? undefined,
    });

    this.toastService.sendInfo(`"${title}" wurde gespeichert`);
    this.router.navigate(['/list']);
  }
}
