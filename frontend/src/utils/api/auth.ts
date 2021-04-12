import request from './helpers/api';
import parseErrors from './helpers/parse-errors';

interface LoginBody {
  username: string,
  email: string,
  password: string,
}

interface LoginResponse {
  key: string,
}

interface LoginResult {
  response?: LoginResponse,
  error?: string | Record<string, string|string[]> | null
}

interface SignupBody {
  username: string,
  email: string,
  password1: string,
  password2: string,
}

interface SignupResponse {
  key: string,
}

interface SignupResult {
  response?: SignupResponse,
  error?: string | Record<string, string|string[]> | null
}

function authApi (token?: string) {
  const api = request(token);

  return {
    login: async (body: LoginBody): Promise<LoginResult> => {
      try {
        const res = await api.post<LoginBody, LoginResponse>('rest-auth/login/', body);
        return { response: res };
      } catch (e) {
        if (e.status && e.data) {
          return { error: parseErrors(e.data) };
        }
        return { error: { non_field_errors: 'Sorry, a problem has occurred' } };
      }
    },

    signup: async (body: SignupBody): Promise<SignupResult> => {
      try {
        const res = await api.post<SignupBody, SignupResponse>('rest-auth/registration/', body);
        return { response: res };
      } catch (e) {
        if (e.status && e.data) {
          return { error: parseErrors(e.data) };
        }
        return { error: { non_field_errors: 'Sorry, a problem has occurred' } };
      }
    },
  };
}

export default authApi;
