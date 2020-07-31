/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatternService } from './Pattern.service';

describe('Service: Pattern', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatternService]
    });
  });

  it('should ...', inject([PatternService], (service: PatternService) => {
    expect(service).toBeTruthy();
  }));
});
