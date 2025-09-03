import { Component, OnInit, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskLocalService } from '../../domain/task-local.service';
import { TaskRemoteService } from '../../domain/task-remote.service';
import { TaskSocketService } from '../../domain/task-socket.service';
import { TaskQuickComponent } from '../../components/task-quick/task-quick';
import { TaskItemComponent } from '../../components/task-item/task-item';

type Mode = 'local' | 'rest' | 'socket';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskItemComponent, TaskQuickComponent, FormsModule],
})
export class TaskListComponent implements OnInit {
  selectedMode = model<Mode>('rest');

  tasks = computed(() => {
    switch (this.selectedMode()) {
      case 'local':
        return this.localService.items();

      case 'socket':
        return this.socketService.items();

      default:
        return this.remoteService.items();
    }
  });

  constructor(
    private localService: TaskLocalService,
    private remoteService: TaskRemoteService,
    private socketService: TaskSocketService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.remoteService.loadTasks();
  }
}
