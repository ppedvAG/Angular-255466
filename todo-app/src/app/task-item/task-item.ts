import { Component, Input } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItemComponent {
  @Input() item = { title: 'Nicht angegeben' } as TaskItem;
}
