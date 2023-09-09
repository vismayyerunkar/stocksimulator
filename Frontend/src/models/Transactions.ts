import { IGenericResponse } from './genericModels';

export interface Transactions {}
export interface ITransactionsResponse extends IGenericResponse {
  data: any[];
}
