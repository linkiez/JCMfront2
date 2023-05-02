/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendedorService } from './vendedor.service';
import { AppModule } from '../app.module';

describe('Service: Vendedor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [AppModule],
    });
  });

  it('should ...', inject([VendedorService], (service: VendedorService) => {
    expect(service).toBeTruthy();
  }));
});
