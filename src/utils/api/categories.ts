import request from './helpers/api';

export interface Category {
  id: number,
  created_at: Date,
  name: string,
  color: string,
}

interface AddCategoryBody {
  name: string,
  color: number,
}

/**
 * Functions for CRUD interactions with the Categories entity in the backend
 */
const categoriesApi = {
  read: async (): Promise<Category[]> => {
    try {
      return await request.get<Category[]>('api/v1/categories/');
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  create: async (body: AddCategoryBody): Promise<Category|null> => {
    try {
      return await request.post<AddCategoryBody, Category>('api/v1/categories/', body);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export default categoriesApi;
