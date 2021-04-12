import api from './index';
import parseErrors from './parse-errors';

interface LoginBody {
  username: string,
  email: string,
  password: string,
}

interface SignupBody {
  username: string,
  email: string,
  password1: string,
  password2: string,
}

interface LoginRes {

}

interface SignupRes {
  response?: {
    username: string,
    email: string,
    password1: string,
    password2: string,
  },
  error?: string | Record<string, string|string[]> | null
}

export const apiLogin = async (body: LoginBody) => {
  try {
    return await api.post<LoginBody, LoginRes>('rest-auth/login/', body);
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const apiSignup = async (body: SignupBody): Promise<SignupRes> => {
  try {
    const res = await api.post<SignupBody, SignupBody>('rest-auth/registration/', body);
    return { response: res };
  } catch (e) {
    if (e.status && e.data) {
      return { error: parseErrors(e.data) };
    }
    return { error: { non_field_errors: 'Sorry, a problem has occurred' } };
  }
};
