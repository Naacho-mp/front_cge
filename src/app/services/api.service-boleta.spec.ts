import { TestBed } from '@angular/core/testing';

import { ApiServiceBoleta } from './api.service-boleta';

describe('ApiServiceBoleta', () => {
  let service: ApiServiceBoleta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceBoleta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
