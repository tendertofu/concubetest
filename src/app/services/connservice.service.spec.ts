import { TestBed } from '@angular/core/testing';

import { ConnserviceService } from './connservice.service';

describe('ConnserviceService', () => {
  let service: ConnserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
