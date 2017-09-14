import { TestBed, inject } from '@angular/core/testing';

import { RestGameService } from './rest-game.service';

describe('RestGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestGameService]
    });
  });

  it('should be created', inject([RestGameService], (service: RestGameService) => {
    expect(service).toBeTruthy();
  }));
});
