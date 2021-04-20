import request from './helpers/api';

export interface Currency {
  id: number,
  created_at: Date,
  slug: string,
  name: string,
  label: string,
}

/**
 * Functions for CRUD interactions with the Currencies entity in the backend
 */
const currenciesApi = {
  read: async (): Promise<Currency[]> => {
    try {
      return await request.get<Currency[]>('api/v1/currencies/');
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};

export default currenciesApi;
