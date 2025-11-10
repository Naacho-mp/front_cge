import { TestBed } from '@angular/core/testing';

import { ApiServiceCliente } from './api.service-cliente';

describe('ApiServiceCliente', () => {
  let service: ApiServiceCliente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceCliente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
