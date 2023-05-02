import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGenericaComponent } from './lista-generica.component';
import { AppModule } from 'src/app/app.module';
import { ListaGenericaModule } from './lista-generica.module';

describe('ListaGenericaComponent', () => {
  let component: ListaGenericaComponent;
  let fixture: ComponentFixture<ListaGenericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, ListaGenericaModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
