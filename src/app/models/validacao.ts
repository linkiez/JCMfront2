export interface IValidação {
  nome: string;
  funcao: Function;
  resultado?: boolean;
  menssagem: string;
  campo: string;
}
