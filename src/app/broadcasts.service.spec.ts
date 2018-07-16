import { TestBed, inject } from '@angular/core/testing';

import { BroadcastsService } from './broadcasts.service';

describe('BroadcastsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcastsService]
    });
  });

  it('should be created', inject([BroadcastsService], (service: BroadcastsService) => {
    expect(service).toBeTruthy();
  }));
});
