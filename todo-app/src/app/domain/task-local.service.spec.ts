import { TestBed } from '@angular/core/testing';

import { TaskLocalService } from '../../../../demo-app/src/app/domain/task-local.service';

describe('TaskLocalService', () => {
  let service: TaskLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
