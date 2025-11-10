import { TestBed } from '@angular/core/testing';

import { ApiServiceMedidor } from './api.service-medidor';

describe('ApiServiceMedidor', () => {
  let service: ApiServiceMedidor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceMedidor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
