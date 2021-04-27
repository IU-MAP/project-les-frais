import request from './helpers/api';

export interface Category {
  id: number,
  created_at: Date,
  name: string,
  color: string,
}

interface AddCategoryBody {
  name: string,
  color: number|string,
}

/**
 * Functions for CRUD interactions with the Categories entity in the backend
 */
const categoriesApi = {
  read: async (): Promise<Category[]> => {
    try {
      return await request.get<Category[]>('api/v1/categories/');
    } catch (e) {
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

  patch: async (id: number|string, body: AddCategoryBody): Promise<Category|null> => {
    try {
      return await request.patch<AddCategoryBody, Category>(`api/v1/categories/${id}/`, body);
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  remove: async (id: number|string): Promise<Category|null> => {
    try {
      return await request.delete<{}, Category>(`api/v1/categories/${id}/`, {});
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export default categoriesApi;
