import { Injectable, signal } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';
import { DateTime } from 'luxon';

const inTwoDays = DateTime.now().plus({ day: 2 }).toJSDate();

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly items = signal<TaskItem[]>([
    {
      id: '1',
      title: 'Angular Kurs absolvieren',
      priority: 'important',
      dueDate: inTwoDays,
      labels: ['angular', 'kurs'],
      completed: false,
    } as TaskItem,
  ]);

  getTask(id: string): TaskItem | undefined {
    return id ? this.items().find((t) => t.id === id) : undefined;
  }

  addTask(task: Omit<TaskItem, 'id' | 'completed'>) {
    const newTask: TaskItem = {
      ...task,
      id: `${Date.now()}`,
      completed: false,
    };

    this.items.update((tasks) => {
      const arrayCopy = [...tasks, newTask];
      return arrayCopy;
    });
  }

  updateTask(id: string, task: Partial<Omit<TaskItem, 'id'>>) {
    this.items.update((tasks) => {
      const index = tasks.findIndex((t) => t.id === id);
      if (index !== -1) {
        const updatedTask = { ...tasks[index], ...task };
        tasks.splice(index, 1, updatedTask);
      }
      return tasks;
    });
  }

  removeTask(id: string) {
    this.items.update((tasks) => tasks.filter((t) => t.id !== id));
  }
}
