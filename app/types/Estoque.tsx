export type EstoqueItem = {
  id: string;
  produto: string;
  unidadeMedida: string;
  quantidadeAdquirida: number;
  dataAquisicao: Date;
  quantidadeSaidas: number;
  quantidadeRestante: number;
};