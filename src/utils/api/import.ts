import { http } from './helpers/api';

interface ImportResponse {
  data: Record<string, any>,
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
};

export default importApi;
