import { TestBed } from '@angular/core/testing';

import { RutFiltroService } from './rut-filtro-service';

describe('RutFiltroService', () => {
  let service: RutFiltroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutFiltroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
