import auth from './auth';
import category from './categories';
import transactions from './transactions';
import currencies from './currency';
import statistics from './statistics';
import importApi from './import';

const api = {
  auth,
  category,
  transactions,
  currencies,
  statistics,
  import: importApi,
};

export default api;
