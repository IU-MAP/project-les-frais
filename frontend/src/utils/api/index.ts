import auth from './auth';
import useStore from '../../store';

const useApi = () => {
  const store = useStore();
  console.log(store?.state);

  return {
    auth: auth(store?.state?.token || ''),
  };
};

export default useApi;
