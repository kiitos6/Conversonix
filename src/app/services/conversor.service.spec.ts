import { TestBed, inject } from '@angular/core/testing';

import { ConversorService } from './conversor.service';

describe('ConversorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversorService]
    });
  });

  it('should be created', inject([ConversorService], (service: ConversorService) => {
    expect(service).toBeTruthy();
  }));
});
