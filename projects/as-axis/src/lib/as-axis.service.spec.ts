import { TestBed } from '@angular/core/testing';

import { AsAxisService } from './as-axis.service';

describe('AsAxisService', () => {
  let service: AsAxisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsAxisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
