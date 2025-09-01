import { Component } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';
import { TaskItemComponent } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskItemComponent],
})
export class TaskListComponent {
  taskList = [
    {
      title: 'Angular Kurs absolvieren',
    } as TaskItem,
  ];

  // Property fuer Statusausgabe
  status = '';

  addTask(e: Event, title: string) {
    e.preventDefault();

    const newTask: TaskItem = {
      title,
      id: `${Date.now()}`,
      completed: false,
      priority: 'default',
    };

    this.taskList.push(newTask);
    this.setStatus(`${this.taskList.length} Aufgaben insgesamt`);
  }

  setStatus(message: string) {
    this.status = message;
    setTimeout(() => (this.status = ''), 3000);
  }
}
