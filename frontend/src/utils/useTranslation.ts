import useStore from '../store';
import translations from './translations';

/**
 * A hook that returns a translation function depending on the current
 * chosen language and a string key of translating text.
 */
const useTranslation = () => {
  const store = useStore();

  return (key: keyof typeof translations) => {
    const lang = store?.state?.language;
    const translation = translations[key]?.[lang];

    if (!translation) {
      throw new Error(`Wrong translation usage with language ${lang} and key ${key}`);
    }

    return translation;
  };
};

export default useTranslation;
