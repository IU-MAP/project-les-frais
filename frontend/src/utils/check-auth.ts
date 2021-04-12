import { store } from '../store';
import api from './api';

const checkAuth = async (isRouteProtected: boolean) => {
  if (store?.state?.token === 'null') await store.dispatch('changeToken', null);

  if (isRouteProtected) {
    if (store?.state.user) {
      return true;
    }

    if (store?.state.token) {
      const user = await api.auth.profile();
      if (user) {
        await store.dispatch('changeUser', user);
        return true;
      }
    }

    return { name: 'home' };
  }

  // If route is not protected
  if (store?.state.user) {
    return { name: 'dashboard' };
  }

  if (store?.state.token) {
    const user = await api.auth.profile();
    if (user) {
      await store.dispatch('changeUser', user);
      return { name: 'dashboard' };
    }
  }

  return true;
};

export default checkAuth;
