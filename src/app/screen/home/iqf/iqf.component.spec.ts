import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PedidoCompraService } from 'src/app/services/pedidocompra.service';


import { IqfComponent } from './iqf.component';
import { MessageService } from 'primeng/api';

describe('IqfComponent', () => {
  let component: IqfComponent;
  let fixture: ComponentFixture<IqfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IqfComponent],
      imports: [HttpClientTestingModule],
      providers: [PedidoCompraService, MessageService],
    });
    fixture = TestBed.createComponent(IqfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
