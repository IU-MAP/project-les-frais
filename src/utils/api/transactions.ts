import request from './helpers/api';

export interface Transaction {
  id: number,
  created_at: Date,
  type: 'loss'|'gain',
  date: Date,
  title: string,
  price: number,
  currency: number,
  category: number,
  isTemplate: boolean,
}

interface AddTransactionBody {
  type: 'loss'|'gain',
  date: Date,
  title: string,
  price: number,
  currency: number,
  category: number,
}

/**
 * Functions for CRUD interactions with the Transactions entity in the backend
 */
const transactionsApi = {
  read: async (): Promise<Transaction[]> => {
    try {
      return await request.get<Transaction[]>('api/v1/transactions/');
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
};

export default transactionsApi;
