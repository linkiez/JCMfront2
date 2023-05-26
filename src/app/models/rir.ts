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
  cliente?: boolean;
  pessoa?: Pessoa;
  recebido_data?: Date;
  operador?: Operador;
  conferido?: boolean;
  observacoes?: string;
  files?: Arquivo[];
  pedido_compra_item?: PedidoCompraItem;
  ordem_producao_item?: OrdemProducaoItem;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}
