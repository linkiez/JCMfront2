export interface ListaGenerica {
  id?: number;
  nome?: string;
  lista_generica_items: Array<ListaGenericaItem>;
  deletedAt?: Date;
  updateAt?: Date;
  createAt?: Date;
}

export interface ListaGenericaItem {
  id?: number;
  valor?: string;
  valor2?:
    | string
    | {
        width: number;
        height: number;
        margin: { left: number; right: number; top: number; bottom: number };
      };
  deletedAt?: Date;
  updateAt?: Date;
  createAt?: Date;
  id_lista?: number;
}
