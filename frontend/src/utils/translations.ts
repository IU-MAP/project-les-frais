import useStore from '../store/index';
import { LANGS } from './constants';

export const translations: Record<string, Record<LANGS, string>> = {
  langs_rus: {
    rus: 'Русский',
    eng: 'Russian',
  },
  langs_eng: {
    rus: 'Английский',
    eng: 'English',
  },
  login: {
    rus: 'Войти',
    eng: 'Log In',
  },
  signup: {
    rus: 'Зарегистрироваться',
    eng: 'Sign Up',
  },
  home_title: {
    rus: 'Контроль расходов, который вы заслужили!',
    eng: 'An expense tracker you deserve!',
  },
  home_subtitle: {
    rus: 'Импортируйте данные из любого источника и наслаждайтесь удобством инструмента: статистика, кошельки, бюджетирование, конвертация валют и много другого! Все в ваших руках!',
    eng: 'Import your data from any source and enjoy the power of this tool: statistics, wallets, budgeting, currency converter. Everything is in your hand!',
  },
  home_action: {
    rus: 'Создать аккаунт',
    eng: 'Create account',
  },
  auth_login: {
    rus: 'Вход',
    eng: 'Log In',
  },
  auth_signup: {
    rus: 'Регистрация',
    eng: 'Sign Up',
  },
  auth_email: {
    rus: 'Е-мейл',
    eng: 'Email',
  },
  auth_password: {
    rus: 'Пароль',
    eng: 'Password',
  },
  auth_confirm: {
    rus: 'Повторите пароль',
    eng: 'Confirm password',
  },
  auth_action: {
    rus: 'Подтвердить',
    eng: 'Submit',
  },
  auth_have: {
    rus: 'У меня уже есть аккаунт.',
    eng: 'I already have an account.',
  },
  auth_dont: {
    rus: 'У меня еще нет аккаунта.',
    eng: 'I don\'t have an account.',
  },
  settings: {
    rus: 'Настройки',
    eng: 'Settings',
  },
  empty: {
    rus: '',
    eng: '',
  },
};

const useT = () => {
  const store = useStore();

  const t = (key: keyof typeof translations) => {
    const lang = store?.state?.language;
    const translation = translations[key]?.[lang];

    if (!translation) {
      throw new Error(`Wrong translation usage with language ${lang} and key ${key}`);
    }

    return translation;
  };

  return t;
};

export default useT;
