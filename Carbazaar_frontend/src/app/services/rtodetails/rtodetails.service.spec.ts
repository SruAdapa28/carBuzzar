import { TestBed } from '@angular/core/testing';

import { RtodetailsService } from './rtodetails.service';

describe('RtodetailsService', () => {
  let service: RtodetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtodetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
