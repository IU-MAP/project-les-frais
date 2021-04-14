import { LANGS } from './constants';

const translations: Record<string, Record<LANGS, string>> = {
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
  settings_language: {
    rus: 'Язык',
    eng: 'Language',
  },
  settings_currency: {
    rus: 'Основная валюта',
    eng: 'Main currency',
  },
  settings_currency_btn: {
    rus: 'Российский рубль',
    eng: 'Russian rouble',
  },
  settings_import: {
    rus: 'Импорт данных',
    eng: 'Import data',
  },
  settings_import_btn: {
    rus: 'Импорт из .XLS',
    eng: 'Import from .XLS',
  },
  settings_export: {
    rus: 'Экспорт данных',
    eng: 'Export data',
  },
  settings_export_btn: {
    rus: 'Экспорт в .XLS',
    eng: 'Export to .XLS',
  },
  settings_logout: {
    rus: 'Выйти',
    eng: 'Log Out',
  },
  settings_logout_btn: {
    rus: 'Выйти из аккаунта',
    eng: 'Log out from account',
  },
  settings_delete: {
    rus: 'Удалить аккаунт',
    eng: 'Delete account',
  },
  settings_delete_btn: {
    rus: 'Удалить все данные',
    eng: 'Delete all user data',
  },
  settings_tabs_profile: {
    rus: 'Профиль',
    eng: 'Profile',
  },
  settings_tab_profile: {
    rus: 'Настройки профиля',
    eng: 'Profile settings',
  },
  settings_tabs_categories: {
    rus: 'Категории',
    eng: 'Categories',
  },
  settings_tab_categories: {
    rus: 'Все категории',
    eng: 'All categories',
  },
  settings_tabs_templates: {
    rus: 'Шаблоны',
    eng: 'Templates',
  },
  settings_tab_templates: {
    rus: 'Шаблоны расходы',
    eng: 'Expense templates',
  },
  empty: {
    rus: '',
    eng: '',
  },
};

export default translations;
