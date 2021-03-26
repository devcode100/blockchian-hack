import { TestBed } from '@angular/core/testing';

import { ReliefRequestService } from './relief-request.service';

describe('ReliefRequestService', () => {
  let service: ReliefRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReliefRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
