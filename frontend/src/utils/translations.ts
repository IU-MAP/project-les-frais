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

  return {
    t,
  };
};

export default useT;
