import { TestBed, inject } from '@angular/core/testing';

import { ClipsService } from './clips.service';

describe('ClipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipsService]
    });
  });

  it('should be created', inject([ClipsService], (service: ClipsService) => {
    expect(service).toBeTruthy();
  }));
});
