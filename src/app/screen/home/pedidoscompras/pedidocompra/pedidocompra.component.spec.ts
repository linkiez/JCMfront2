import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidocompraComponent } from './pedidocompra.component';

describe('PedidocompraComponent', () => {
  let component: PedidocompraComponent;
  let fixture: ComponentFixture<PedidocompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidocompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidocompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
