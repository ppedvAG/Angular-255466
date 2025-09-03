import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  OnInit,
  viewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItem } from '../../../lib/models/task-item';
import { DateTime } from 'luxon';
import { TaskRemoteService } from '../../domain/task-remote.service';
import { ToastService } from '../../domain/toast-service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent implements OnInit {
  formGroup?: FormGroup;
  labelRefs = viewChildren<ElementRef<HTMLInputElement>>('labelRef');

  get labels(): FormArray {
    return <FormArray>this.formGroup?.get('labels');
  }

  addLabel() {
    this.labels.push(this.formBuilder.control(''));
  }

  private focusLastAlias() {
    const refs = this.labelRefs();
    if (refs.length) {
      refs[refs.length - 1].nativeElement.focus();
    }
  }

  get id(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  get editing(): boolean {
    return Boolean(this.id);
  }

  constructor(
    private taskService: TaskRemoteService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    effect(() => this.focusLastAlias());
  }

  ngOnInit(): void {
    const task =
      this.taskService.getTask(this.id ?? '') ??
      <TaskItem>{
        priority: 'default',
      };
    const dueDate = task.dueDate ? DateTime.fromJSDate(task.dueDate).toISODate() : '';
    const labels = task.labels ? task.labels.map((e) => this.formBuilder.control(e)) : [];
    this.formGroup = this.formBuilder.group({
      id: { value: task.id, disabled: true },
      title: [task.title, Validators.required],
      dueDate: dueDate,
      priority: task.priority,
      labels: this.formBuilder.array(labels),
    });
  }

  async submit() {
    const task: TaskItem = {
      id: this.id || '',
      title: this.formGroup!.value.title!,
      dueDate: this.formGroup!.value.dueDate
        ? DateTime.fromISO(this.formGroup!.value.dueDate).toJSDate()
        : undefined,
      priority: this.formGroup!.value.priority!,
      labels: this.labels.value,
      completed: false,
    };

    if (this.editing) {
      await this.taskService.updateTask(this.id!, task);
      this.toastService.sendInfo(`"${task.title}" wurde gespeichert`);
    } else {
      const list = await this.taskService.addTask(task);
      this.toastService.sendInfo(`${list.length} Aufgaben insgesamt`);
    }

    this.router.navigate(['/list']);
  }
}
