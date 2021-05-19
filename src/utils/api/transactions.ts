import request from './helpers/api';
import type { Category } from './categories';
import type { Currency } from './currency';
import { getParams } from '../urls';
import { monthBoundaries } from '../format-date';

export interface Transaction {
  id: number,
  created_at: Date,
  type: 'loss'|'gain',
  date: Date,
  title: string,
  price: number|string,
  currency: Currency,
  category: Category,
  description: string,
  isTemplate: boolean,
}

interface GetTransactionArgs {
  month: number,
  year: number,
  date: string,
  isTemplate: boolean,
}

export interface AddTransactionBody {
  type: 'loss'|'gain',
  date: string,
  title: string,
  price: number|string,
  description: string,
  currency: number,
  category: number,
  isTemplate: boolean,
}

/**
 * Functions for CRUD interactions with the Transactions entity in the backend
 */
const transactionsApi = {
  read: async ({
    month,
    year,
    date,
    isTemplate = false,
  }: Partial<GetTransactionArgs>): Promise<Transaction[]> => {
    let params: Record<string, string> = {};
    if (date) {
      params.date = date;
    } else if ((month || month === 0) && year) {
      params = monthBoundaries(month, year);
    }
    params.isTemplate = isTemplate ? 'true' : 'false';

    try {
      return await request.get<Transaction[]>(`api/v1/transactions/?${getParams(params)}`);
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  create: async (body: AddTransactionBody): Promise<Transaction|null> => {
    try {
      return await request.post<AddTransactionBody, Transaction>('api/v1/transactions/', body);
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  update: async (id: number|string, body: AddTransactionBody): Promise<Transaction|null> => {
    try {
      return await request.patch<AddTransactionBody, Transaction>(`api/v1/transactions/${id}/`, body);
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  delete: async (id: number) => {
    try {
      return await request.delete(`api/v1/transactions/${id}/`, {});
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export default transactionsApi;
