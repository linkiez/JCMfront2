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
        produto: {
          categoria: 'Chapa',
          espessura: 2,
          peso: 8,
          pedido_compra_items: [],
          nome: '',
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
          files: [],
          preco: 0,
        },
        largura: 1000,
        altura: 2000,
        quantidade: 3,
        preco_quilo: 10,
        imposto: 0.12,
        descricao: '',
        material_incluido: false,
        processo: [],
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      component.calculaPeso(item);
      expect(item.peso.toFixed(2)).toBeCloseTo(96.87); // (2 * 1) * 8 * 2 * 3
      expect(item.total_peso.toFixed(2)).toBeCloseTo(968.66); // 96 * 10
      expect(item.custo).toBe(0);
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should calculate weight for a Barra item', () => {
      const item: IOrcamentoItem = {
        produto: {
          categoria: 'Barra',
          peso: 5,
          pedido_compra_items: [],
          nome: '',
          espessura: 0,
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
          files: [],
          preco: 0,
        },
        largura: 500,
        quantidade: 4,
        preco_quilo: 10,
        imposto: 0.12,
        descricao: '',
        material_incluido: false,
        processo: [],
        altura: 0,
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(10); // (0.5 * 5 * 4)
      expect(item.total_peso).toBe(100); // 10 * 10
      expect(item.custo).toBe(0);
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should calculate weight for a Peça item', () => {
      const item: IOrcamentoItem = {
        produto: {
          categoria: 'Peça',
          peso: 3,
          pedido_compra_items: [],
          nome: '',
          espessura: 0,
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
          files: [],
          preco: 0,
        },
        quantidade: 5,
        preco_quilo: 10,
        imposto: 0.12,
        descricao: '',
        material_incluido: false,
        processo: [],
        largura: 0,
        altura: 0,
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      component.calculaPeso(item);
      expect(item.peso).toBe(15); // 3 * 5
      expect(item.total_peso).toBe(50); // 15 * 10
      expect(item.custo).toEqual(0);
      expect(messageServiceSpy.add).not.toHaveBeenCalled();
    });

    it('should throw an error for an invalid product category', () => {
      const item: IOrcamentoItem = {
        produto: {
          categoria: 'Invalida',
          pedido_compra_items: [],
          nome: '',
          espessura: 0,
          peso: 0,
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
          files: [],
          preco: 0,
        },
        descricao: '',
        material_incluido: false,
        processo: [],
        largura: 0,
        altura: 0,
        quantidade: 0,
        imposto: 0,
        preco_quilo: 0,
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      expect(() => component.calculaPeso(item)).toThrowError(
        'Categoria do produto invalida: Invalida'
      );
      expect(item.peso).toEqual(0);
      expect(item.total_peso).toEqual(0);
      expect(item.custo).toEqual(0);
      expect(messageServiceSpy.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Erro',
        detail: 'Categoria do produto invalida: Invalida',
      });
    });

    it('should throw an error for an invalid product', () => {
      const item: IOrcamentoItem = {
        produto: undefined,
        descricao: '',
        material_incluido: false,
        processo: [],
        largura: 0,
        altura: 0,
        quantidade: 0,
        imposto: 0,
        preco_quilo: 0,
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      expect(() => component.calculaPeso(item)).toThrowError(
        'Produto inválido'
      );
      expect(item.peso).toEqual(0);
      expect(item.total_peso).toEqual(0);
      expect(item.custo).toEqual(0);
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
          pedido_compra_items: [
            {
              precoComIpi: 2,
              dimensao: '',
              quantidade: 0,
              peso: 0,
              preco: 0,
              ipi: 0,
              prazo: undefined,
              deletedAt: undefined,
              updatedAt: undefined,
              createdAt: undefined,
              produto: undefined,
              peso_entregue: 0,
              status: '',
              pedido_compra: undefined,
              registro_inspecao_recebimentos: [],
            },
          ],
          nome: '',
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
          files: [],
          preco: 0,
        },
        largura: 1000,
        altura: 2000,
        quantidade: 3,
        material_incluido: true,
        preco_quilo: 10,
        imposto: 0.12,
        descricao: '',
        processo: [],
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      component.calculaPeso(item);
      expect(item.peso.toFixed(2)).toBeCloseTo(96.87);
      expect(item.total_peso.toFixed(2)).toBeCloseTo(968.66); // 12 * 10
      expect(item.custo.toFixed(2)).toBeCloseTo(193.73); // 12 * 2
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
          pedido_compra_items: [
            {
              precoComIpi: 2,
              dimensao: '',
              quantidade: 0,
              peso: 0,
              preco: 0,
              ipi: 0,
              prazo: undefined,
              deletedAt: undefined,
              updatedAt: undefined,
              createdAt: undefined,
              produto: undefined,
              peso_entregue: 0,
              status: '',
              pedido_compra: undefined,
              registro_inspecao_recebimentos: [],
            },
          ],
          nome: '',
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
          files: [],
          preco: 0,
        },
        largura: 1000,
        altura: 2000,
        material_incluido: true,
        preco_quilo: 10,
        imposto: 0.12,
        descricao: '',
        processo: [],
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      component.calculaHora(item);
      expect(item.total_hora).toBe(150); // (1.5 * 50 * 2)
    });

    it('should set total_hora to 0 if hora, preco_hora or quantidade is not defined', () => {
      const item: IOrcamentoItem = {
        tempo: '01:30:00',
        produto: {
          pedido_compra_items: [
            {
              precoComIpi: 2,
              dimensao: '',
              quantidade: 0,
              peso: 0,
              preco: 0,
              ipi: 0,
              prazo: undefined,
              deletedAt: undefined,
              updatedAt: undefined,
              createdAt: undefined,
              produto: undefined,
              peso_entregue: 0,
              status: '',
              pedido_compra: undefined,
              registro_inspecao_recebimentos: [],
            },
          ],
          nome: '',
          categoria: 'Chapa',
          espessura: 0,
          peso: 0,
          updatedAt: undefined,
          createdAt: undefined,
          deletedAt: undefined,
          files: [],
          preco: 0,
        },
        largura: 1000,
        altura: 2000,
        material_incluido: true,
        preco_quilo: 10,
        imposto: 0.12,
        descricao: '',
        processo: [],
        quantidade: 0,
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
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
      const item: IOrcamentoItem = {
        descricao: '',
        produto: undefined,
        material_incluido: false,
        processo: [],
        largura: 0,
        altura: 0,
        quantidade: 0,
        imposto: 0,
        preco_quilo: 0,
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        total_peso: 0,
        total_hora: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };

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
        descricao: '',
        produto: undefined,
        material_incluido: false,
        processo: [],
        largura: 0,
        altura: 0,
        quantidade: 0,
        preco_quilo: 0,
        tempo: '',
        preco_hora: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      component.calculaTotal(item);
      expect(item.total).toBe(100);
    });

    it('should calculate total correctly based on total_peso, total_hora and imposto', () => {
      const item: IOrcamentoItem = {
        total_peso: 100,
        total_hora: 200,
        imposto: 0.2,
        descricao: '',
        produto: undefined,
        material_incluido: false,
        processo: [],
        largura: 0,
        altura: 0,
        quantidade: 0,
        preco_quilo: 0,
        tempo: '',
        preco_hora: 0,
        total_manual: 0,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        files: [],
        peso: 0,
        total: 0,
        custo: 0,
        orcamento: undefined,
        registro_inspecao_recebimento: undefined,
      };
      component.calculaTotal(item);
      expect(item.total).toBeCloseTo(375); // ((100 + 200) / (1 - 0.2))
    });
  });

  describe('calculaTotais', () => {
    beforeEach(() => {
      component.orcamento = {
        empresa: {
          id: 1,
          senha: '',
          deletedAt: undefined,
          updatedAt: undefined,
          createdAt: undefined,
          pessoa: undefined,
          token_tiny: '',
          logoColor: undefined,
          logoBlack: undefined,
        },
        orcamento_items: [
          {
            total: 10,
            descricao: '',
            produto: undefined,
            material_incluido: false,
            processo: [],
            largura: 0,
            altura: 0,
            quantidade: 0,
            imposto: 0,
            preco_quilo: 0,
            tempo: '',
            preco_hora: 0,
            total_manual: 0,
            deletedAt: undefined,
            updatedAt: undefined,
            createdAt: undefined,
            files: [],
            peso: 0,
            total_peso: 0,
            total_hora: 0,
            custo: 0,
            orcamento: undefined,
            registro_inspecao_recebimento: undefined,
          },
          {
            total: 20,
            descricao: '',
            produto: undefined,
            material_incluido: false,
            processo: [],
            largura: 0,
            altura: 0,
            quantidade: 0,
            imposto: 0,
            preco_quilo: 0,
            tempo: '',
            preco_hora: 0,
            total_manual: 0,
            deletedAt: undefined,
            updatedAt: undefined,
            createdAt: undefined,
            files: [],
            peso: 0,
            total_peso: 0,
            total_hora: 0,
            custo: 0,
            orcamento: undefined,
            registro_inspecao_recebimento: undefined,
          },
          {
            total: 30,
            descricao: '',
            produto: undefined,
            material_incluido: false,
            processo: [],
            largura: 0,
            altura: 0,
            quantidade: 0,
            imposto: 0,
            preco_quilo: 0,
            tempo: '',
            preco_hora: 0,
            total_manual: 0,
            deletedAt: undefined,
            updatedAt: undefined,
            createdAt: undefined,
            files: [],
            peso: 0,
            total_peso: 0,
            total_hora: 0,
            custo: 0,
            orcamento: undefined,
            registro_inspecao_recebimento: undefined,
          },
        ],
        frete: 5,
        desconto: 2,
        total: 1,
        response: undefined,
        status: undefined,
        contato: undefined,
        pessoa: undefined,
        id: undefined,
        observacao: undefined,
        deletedAt: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        vendedor: undefined,
        prazo_emdias: undefined,
        prazo_data: undefined,
        aprovacao: undefined,
        pc_cliente: undefined,
        cond_pag: undefined,
        embalagem: undefined,
        transporte: undefined,
        imposto: undefined,
        vendastinies: undefined,
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

    it('should handle negative values correctly', () => {
      component.orcamento = {
        orcamento_items: [{ total: 100 } as any, { total: -50 }, { total: 75 }],
        frete: 10,
        desconto: 20,
        total: 0,
      } as any;
      component.calculaTotais();
      expect(component.orcamento.total).toBe(115);
    });

    it('should handle floating point numbers correctly', () => {
      component.orcamento = {
        orcamento_items: [{ total: 10.5 } as any, { total: 20.75 }, { total: 30.25 }],
        frete: 5.5,
        desconto: 2.75,
        total: 0,
      } as any;
      component.calculaTotais();
      expect(component.orcamento.total).toBe(64.25);
    });

    it('should handle very large numbers', () => {
      component.orcamento = {
        orcamento_items: [
          { total: 1000000 } as any,
          { total: 2000000 } as any,
          { total: 3000000 } as any,
        ],
        frete: 100000,
        desconto: 50000,
        total: 0,
      } as any;
      component.calculaTotais();
      expect(component.orcamento.total).toBe(6050000);
    });

    it('should handle all zero values', () => {
      component.orcamento = {
        orcamento_items: [{ total: 0 }, { total: 0 }, { total: 0 }],
        frete: 0,
        desconto: 0,
        total: 0,
      } as any;
      component.calculaTotais();
      expect(component.orcamento.total).toBe(0);
    });

    it('should handle null values in orcamento_items', () => {
      component.orcamento = {
        orcamento_items: [{ total: 100 }, { total: null }, { total: 200 }],
        frete: 50,
        desconto: 25,
        total: 0,
      } as any;
      component.calculaTotais();
      expect(component.orcamento.total).toBe(325);
    });

    it('should handle undefined frete and desconto', () => {
      component.orcamento = {
        orcamento_items: [{ total: 100 }, { total: 200 }, { total: 300 }],
        frete: undefined,
        desconto: undefined,
        total: 0,
      } as any;
      component.calculaTotais();
      expect(component.orcamento.total).toBe(600);
    });
  });
});

