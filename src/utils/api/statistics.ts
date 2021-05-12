import request from './helpers/api';
import { monthBoundaries } from '../format-date';
import { getParams } from '../urls';

export interface CategoryStatistics {
  id: number,
  created_at: Date,
  name: string,
  color: number,
  transactions_sum: number,
}

const statisticsApi = {
  categories: async ({ month, year }: { month: number, year: number }): Promise<CategoryStatistics[]> => {
    const params = monthBoundaries(month, year);
    try {
      return await request.get<CategoryStatistics[]>(`api/v1/category_statistic/?${getParams(params)}`);
    } catch (e) {
      return [];
    }
  },
};

export default statisticsApi;
