/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoComponent } from './orcamento.component';
import { IOrcamentoItem } from 'src/app/models/orcamento';
import { MessageService } from 'primeng/api';
import { AppModule } from 'src/app/app.module';
import { OrcamentosModule } from '../orcamentos.module';

describe('OrcamentoComponent', () => {
  let component: OrcamentoComponent;
  let fixture: ComponentFixture<OrcamentoComponent>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrcamentosModule],
      providers: [
        {
          provide: MessageService,
          useValue: jasmine.createSpyObj('MessageService', ['add']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
    fixture = TestBed.createComponent(OrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('calculaPeso', () => {
    it('should calculate weight for a Chapa item', () => {
      const item: IOrcamentoItem = {
        produto: { categoria: 'Chapa', espessura: 2, peso: 8 },
        largura: 1000,
        altura: 2000,
        quantidade: 3,
        preco_quilo: 10,
        imposto: 0.12,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(96); // (2 * 1) * 8 * 2 * 3
      expect(item.total_peso).toBe(960); // 96 * 10
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should calculate weight for a Barra item', () => {
      const item: IOrcamentoItem = {
        produto: { categoria: 'Barra', peso: 5 },
        largura: 500,
        quantidade: 4,
        preco_quilo: 10,
        imposto: 0.12,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(10); // (0.5 * 5 * 4)
      expect(item.total_peso).toBe(100); // 10 * 10
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should calculate weight for a Peça item', () => {
      const item: IOrcamentoItem = {
        produto: { categoria: 'Peça', peso: 3 },
        quantidade: 5,
        preco_quilo: 10,
        imposto: 0.12,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(15); // 3 * 5
      expect(item.total_peso).toBe(50); // 15 * 10
      expect(item.custo).toBeUndefined();
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should throw an error for an invalid product category', () => {
      const item: IOrcamentoItem = {
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
      const item: IOrcamentoItem = {
        produto: undefined,
      };
      expect(() => component.calculaPeso(item)).toThrowError(
        'Produto inválido'
      );
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
      const item: IOrcamentoItem = {
        produto: {
          categoria: 'Chapa',
          espessura: 2,
          peso: 8,
          pedido_compra_items: [{ precoComIpi: 2 }],
        },
        largura: 1000,
        altura: 2000,
        quantidade: 3,
        material_incluido: true,
        preco_quilo: 10,
        imposto: 0.12,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(96);
      expect(item.total_peso).toBe(960); // 12 * 10
      expect(item.custo).toBe(192); // 12 * 2
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });
  });

  describe('calculaHora', () => {
    it('should calculate total_hora correctly', () => {
      const item: IOrcamentoItem = {
        tempo: '01:30:00',
        preco_hora: 50,
        quantidade: 2,
        produto: {
          categoria: 'Chapa',
          espessura: 2,
          peso: 8,
          pedido_compra_items: [{ precoComIpi: 2 }],
        },
        largura: 1000,
        altura: 2000,
        material_incluido: true,
        preco_quilo: 10,
        imposto: 0.12,
      };
      component.calculaHora(item);
      expect(item.total_hora).toBe(150); // (1.5 * 50 * 2)
    });

    it('should set total_hora to 0 if hora, preco_hora or quantidade is not defined', () => {
      const item: IOrcamentoItem = {
        tempo: '01:30:00',
        produto: { pedido_compra_items: [{ precoComIpi: 2 }] },
        largura: 1000,
        altura: 2000,
        material_incluido: true,
        preco_quilo: 10,
        imposto: 0.12,
      };
      spyOn(component, 'calculaTotal');
      component.calculaHora(item);
      expect(item.total_hora).toBe(0);

      item.tempo = undefined;
      item.preco_hora = 50;
      component.calculaHora(item);
      expect(item.total_hora).toBe(0);

      item.tempo = '01:30:00';
      item.preco_hora = undefined;
      component.calculaHora(item);
      expect(item.total_hora).toBe(0);

      item.preco_hora = 50;
      item.quantidade = undefined;
      component.calculaHora(item);
      expect(item.total_hora).toBe(0);
    });
  });

  describe('calculaTotal', () => {
    it('should throw an error if total is equal to 0', () => {
      const item: IOrcamentoItem = {};

      expect(() => component.calculaTotal(item)).toThrowError(
        'Total do item inválido'
      );
      expect(messageServiceSpy.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Erro',
        detail: 'Total do item inválido',
      });
    });

    it('should set total to total_manual if it is greater than 0', () => {
      const item: IOrcamentoItem = {
        total_manual: 100,
        imposto: 0.2,
        total_peso: 100,
        total_hora: 200,
      };
      component.calculaTotal(item);
      expect(item.total).toBe(100);
    });

    it('should calculate total correctly based on total_peso, total_hora and imposto', () => {
      const item: IOrcamentoItem = {
        total_peso: 100,
        total_hora: 200,
        imposto: 0.2,
      };
      component.calculaTotal(item);
      expect(item.total).toBeCloseTo(375); // ((100 + 200) / (1 - 0.2))
    });
  });

  describe('OrcamentoComponent', () => {
    beforeEach(() => {
      component.orcamento = {
        empresa: { id: 1 },
        orcamento_items: [{ total: 10 }, { total: 20 }, { total: 30 }],
        frete: 5,
        desconto: 2,
        total: 1,
      };
    });

    it('should calculate the total correctly', () => {
      component.calculaTotais();
      expect(component.orcamento.total).toBe(63.0);
    });

    it('should set the total to 3 if there are no items', () => {
      component.orcamento.orcamento_items = [];
      component.calculaTotais();
      expect(component.orcamento.total).toBe(3);
    });

    it('should handle undefined values', () => {
      component.orcamento.orcamento_items[1].total = undefined;
      component.orcamento.frete = undefined;
      component.calculaTotais();
      expect(component.orcamento.total).toBe(38);
    });
  });
});
