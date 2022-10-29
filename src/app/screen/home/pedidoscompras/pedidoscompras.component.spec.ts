import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoscomprasComponent } from './pedidoscompras.component';

describe('PedidoscomprasComponent', () => {
  let component: PedidoscomprasComponent;
  let fixture: ComponentFixture<PedidoscomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoscomprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoscomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
