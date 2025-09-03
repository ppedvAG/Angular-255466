import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQuickComponent as TaskQuick } from './task-quick';

describe('TaskQuick', () => {
  let component: TaskQuick;
  let fixture: ComponentFixture<TaskQuick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskQuick],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskQuick);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
