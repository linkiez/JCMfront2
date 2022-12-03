import { Arquivo } from "./arquivo";

export interface Produto {
  id?: number;
  nome?: string;
  categoria?: string;
  espessura?: number;
  peso?: number;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
  files?: Array<Arquivo>;

}
