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
  remove: {
    rus: 'Удалить',
    eng: 'Remove',
  },
  cancel: {
    rus: 'Отменить',
    eng: 'Cancel',
  },

  /**
   * Home page
   */
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

  /**
   * Auth page
   */
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
    eng: 'E-mail',
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
  auth_login_error: {
    rus: 'Неправильный Е-мейл или пароль.',
    eng: 'E-mail or password is incorrect.',
  },

  /**
   * Settings page
   */
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
  settings_delete_btn_sure: {
    rus: 'Вы уверены?',
    eng: 'Are you sure?',
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
  settings_tab_categories_color: {
    rus: 'Цвет',
    eng: 'Color',
  },
  settings_tab_categories_no_categories: {
    rus: 'У вас пока нет добавленных категорий',
    eng: 'You don\'t have categories yet',
  },
  settings_tabs_templates: {
    rus: 'Шаблоны',
    eng: 'Templates',
  },
  settings_tab_templates: {
    rus: 'Шаблоны расходы',
    eng: 'Expense templates',
  },

  /**
   * Dashboard add transactions form
   */
  add_loss: {
    rus: 'Расх',
    eng: 'Loss',
  },
  add_gain: {
    rus: 'Дох',
    eng: 'Gain',
  },
  add_new_loss_name: {
    rus: 'Название статьи расхода',
    eng: 'New expense name',
  },
  add_new_gain_name: {
    rus: 'Название статьи дохода',
    eng: 'New income name',
  },
  add_price: {
    rus: 'Цена',
    eng: 'Price',
  },
  add_currency: {
    rus: 'Валюта',
    eng: 'Currency',
  },
  add_no_categories: {
    rus: 'Добавьте категории, прежде чем продолжить',
    eng: 'Add categories before proceed',
  },
  add_additional: {
    rus: 'Дополнительное описание',
    eng: 'Additional description',
  },
  add_additional_placeholder_loss: {
    rus: 'Короткое описание статьи расхода',
    eng: 'Short info about the expense',
  },
  add_additional_placeholder_gain: {
    rus: 'Короткое описание статьи дохода',
    eng: 'Short info about the income',
  },
  add_error: {
    rus: 'Извините, произошла ошибка',
    eng: 'Sorry, an unexpected error happened',
  },

  /**
   * Dashboard list of transactions
   */
  dashboard_no_transactions: {
    rus: 'За данный период не найдено транзакций',
    eng: 'No transactions found for this period',
  },
  dashboard_transaction_remove: {
    rus: 'Удалить',
    eng: 'Remove',
  },
  dashboard_transaction_select: {
    rus: 'Выбрать',
    eng: 'Select',
  },
  dashboard_transaction_edit: {
    rus: 'Редактировать',
    eng: 'Edit',
  },

  import_update_file: {
    rus: 'Обновить файл',
    eng: 'Update file',
  },
  import_h1: {
    rus: 'Импорт данных',
    eng: 'Data Import',
  },
  import_import: {
    rus: 'Импорт',
    eng: 'Import',
  },
  import_info: {
    rus: 'Чтобы избежать ошибок при импорте ваших расходов, .XLS или .XLSX файл должен содержать 4 колонки в любом порядке и с любым название, лишь бы были: дата, название расхода, категория и цена. После импорта, ниже появится таблица, которая поможет приложению понять, что означает каждая из колонок.',
    eng: 'In order to properly import your expenses data, the .XLS or .XLSX file should contain 4 columns in any order and naming of your will: Date, Expense name, Category and Price. After importing, the table will appear below to help us understand which column belongs to which data field.',
  },
  import_choose_field: {
    rus: 'Выберите',
    eng: 'Choose field',
  },
  import_name: {
    rus: 'Название',
    eng: 'Name',
  },
  import_date: {
    rus: 'Дата',
    eng: 'Date',
  },
  import_category: {
    rus: 'Категория',
    eng: 'Category',
  },
  import_price: {
    rus: 'Цена',
    eng: 'Price',
  },

  empty: {
    rus: '',
    eng: '',
  },
};

export default translations;
