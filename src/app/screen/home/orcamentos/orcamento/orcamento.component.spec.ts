/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { OrcamentoComponent } from './orcamento.component';
import { OrcamentoItem } from 'src/app/models/orcamento';
import { MessageService } from 'primeng/api';

describe('OrcamentoComponent', () => {
  let component: OrcamentoComponent;
  let fixture: ComponentFixture<OrcamentoComponent>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoComponent ],
      providers: [
        { provide: MessageService, useValue: jasmine.createSpyObj('MessageService', ['add'])}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('calculaPeso', () => {


    beforeEach(() => {
    });

    it('should calculate weight for a Chapa item', () => {
      const item: OrcamentoItem = {
        produto: { categoria: 'Chapa', espessura: 2, peso: 10 },
        largura: 1000,
        altura: 2000,
        quantidade: 3,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(12); // (1 * 2 * 10 * 3) / 1000
      expect(item.total_peso).toBe(120); // 12 * 10
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should calculate weight for a Barra item', () => {
      const item: OrcamentoItem = {
        produto: { categoria: 'Barra', peso: 5 },
        largura: 500,
        quantidade: 4,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(10); // (0.5 * 5 * 4) / 1000
      expect(item.total_peso).toBe(50); // 10 * 5
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should calculate weight for a Peça item', () => {
      const item: OrcamentoItem = {
        produto: { categoria: 'Peça', peso: 3 },
        quantidade: 5,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(15); // 3 * 5
      expect(item.total_peso).toBe(15); // 15 * 1
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should throw an error for an invalid product category', () => {
      const item: OrcamentoItem = {
        produto: { categoria: 'Invalida' } as any,
      };
      expect(() => component.calculaPeso(item)).toThrowError(
        'Categoria do produto invalida: Invalida'
      );
      expect(item.peso).toBeUndefined();
      expect(item.total_peso).toBeUndefined();
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Erro',
        detail: 'Categoria do produto invalida: Invalida',
      });
    });

    it('should throw an error for an invalid product', () => {
      const item: OrcamentoItem = {
        produto: undefined,
      };
      expect(() => component.calculaPeso(item)).toThrowError('Produto inválido');
      expect(item.peso).toBeUndefined();
      expect(item.total_peso).toBeUndefined();
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto inválido',
      });
    });

    it('should calculate cost if material is included', () => {
      const item: OrcamentoItem = {
        produto: { categoria: 'Chapa', peso: 10, pedido_compra_items: [{ precoComIpi: 2 }] },
        largura: 1000,
        altura: 2000,
        quantidade: 3,
        material_incluido: true,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(12); // (1 * 2 * 10 * 3) / 1000
      expect(item.total_peso).toBe(120); // 12 * 10
      expect(item.custo).toBe(24); // 12 * 2
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });
  });

});
