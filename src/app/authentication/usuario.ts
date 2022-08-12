import { Pessoa } from "./pessoa";

export interface Usuario {
  id?: number,
  email?: string,
  pessoa?: Pessoa
}
