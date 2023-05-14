import { Arquivo } from "./arquivo";
import { Operador } from "./operador";
import { OrdemProducaoItem } from "./ordem-producao";
import { PedidoCompraItem } from "./pedido-compra";
import { Pessoa } from "./pessoa";
import { Produto } from "./produto";

export interface RIR {
  id?:number;
  descricao?:string;
  produto?: Produto;
  quantidade?:number;
  nfe?:string;
  nfe_data?:Date;
  cliente?: Boolean;
  pessoa?: Pessoa;
  operador?: Operador;
  recebido_data?: Date;
  conferido?: boolean;
  observacoes?: string;
  registro_inspecao_recebimento_file?: Arquivo[];
  pedido_compra_item?: PedidoCompraItem;
  ordem_producao_item?: OrdemProducaoItem;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}
