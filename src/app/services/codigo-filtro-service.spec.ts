import { TestBed } from '@angular/core/testing';

import { CodigoFiltroService } from './codigo-filtro-service';

describe('CodigoFiltroService', () => {
  let service: CodigoFiltroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodigoFiltroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
