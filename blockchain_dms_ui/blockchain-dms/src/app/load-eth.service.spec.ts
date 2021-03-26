import { TestBed } from '@angular/core/testing';

import { LoadEthService } from './load-eth.service';

describe('LoadEthService', () => {
  let service: LoadEthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadEthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
