import { IGenericResponse } from './genericModels';

export interface Transactions {
price: string;
type:string;
symbol:string;
date:string;
}

export interface ITransactionsResponse extends IGenericResponse {
  data: any[];
}
