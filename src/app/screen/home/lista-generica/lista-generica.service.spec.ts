import { TestBed } from '@angular/core/testing';

import { ListaGenericaService } from '../../../services/lista-generica.service';

describe('ListaGenericaService', () => {
  let service: ListaGenericaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaGenericaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
