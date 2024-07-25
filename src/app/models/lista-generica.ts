export interface IListaGenerica {
  id: number;
  nome: string;
  lista_generica_items: Partial<IListaGenericaItem>[];
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

export interface IListaGenericaItem {
  id: number;
  valor: string;
  valor2: string;

  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  id_lista: number;
}

export interface IPrinterSettings {
  id: number;
  id_lista: number;
  valor: string;
  valor2: {
        width: number;
        height: number;
        margin: { left: number; right: number; top: number; bottom: number };
        fontSize: number;
      };
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}
