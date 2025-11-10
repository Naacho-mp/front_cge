import { TestBed } from '@angular/core/testing';

import { ApiServiceLectura } from './api.service-lectura';

describe('ApiServiceLectura', () => {
  let service: ApiServiceLectura;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceLectura);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
