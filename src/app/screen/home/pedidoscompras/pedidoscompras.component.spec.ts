import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosComprasComponent } from './pedidoscompras.component';
import { AppModule } from 'src/app/app.module';
import { PedidosComprasModule } from './pedidoscompras.module';

describe('PedidoscomprasComponent', () => {
  let component: PedidosComprasComponent;
  let fixture: ComponentFixture<PedidosComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PedidosComprasModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
