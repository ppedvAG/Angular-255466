import { Component, viewChild } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';
import { TaskItemComponent } from '../task-item/task-item';
import { StatusElementComponent } from '../shared/status-element/status-element';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskItemComponent, StatusElementComponent],
})
export class TaskListComponent {
  // @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

  // mit signals
  formRef = viewChild<HTMLFormElement>('formRef');

  get valid() {
    // return this.formRef?.nativeElement.checkValidity();

    // mit signals
    return this.formRef()?.checkValidity();
  }

  taskList = [
    {
      title: 'Angular Kurs absolvieren',
    } as TaskItem,
  ];

  // Property fuer Statusausgabe
  status = '';
  currentStatusId = 0;

  addTask(e: Event, title: string) {
    e.preventDefault();

    if (!this.valid) {
      this.setStatus('Bitte geben Sie den Titel der Aufgabe ein.');
    } else {
      const newTask: TaskItem = {
        title,
        id: `${Date.now()}`,
        completed: false,
        priority: 'default',
      };

      this.taskList.push(newTask);
      this.setStatus(`${this.taskList.length} Aufgaben insgesamt`);

      // mit signals
      this.formRef()?.reset();
    }
  }

  setStatus(message: string) {
    this.status = message;

    if (this.currentStatusId) {
      clearTimeout(this.currentStatusId);
    }

    this.currentStatusId = setTimeout(() => (this.status = ''), 3000);
  }
}
