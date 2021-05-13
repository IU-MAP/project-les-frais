import request, { http } from './helpers/api';
import { AddTransactionBody, Transaction } from './transactions';

export interface ImportSheet {
  data: (string|number|null)[][],
  headers: string[],
}

export interface ImportResponse {
  sheets: Record<string, ImportSheet>,
}

/**
 * Functions for importing data to the app
 */
const importApi = {
  parseXLS: async (file: File): Promise<ImportResponse|string> => {
    try {
      const data = new FormData();
      data.append('file', file);

      const init = { method: 'put', body: file };
      return await http<ImportResponse>(`api/v1/parce_excel/${file.name}/?fill=copy`, init);
    } catch (e) {
      console.error(e);
      return e?.data?.detail || '';
    }
  },

  create: async (body: AddTransactionBody[]): Promise<Transaction[]|null> => {
    try {
      return await request.post<AddTransactionBody[], Transaction[]>('api/v1/transactions/', body);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export default importApi;
