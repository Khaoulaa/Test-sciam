import { TestBed } from '@angular/core/testing';

import { StrictGuard } from './strict.guard';

describe('StrictGuard', () => {
  let guard: StrictGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StrictGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
