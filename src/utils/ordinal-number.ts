import { store } from '../store';
import { LANGS } from './constants';
import { SHORT_MONTH_NAMES } from './format-date';

const engSuffixes = {
  zero: '',
  many: '',
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
};

type OrdinalReturn = { suffix: string, tag: string } | null;

const getOrdinalTranslation = (num: number, month: number): OrdinalReturn => {
  const lang = store.state.language;
  if (lang === LANGS.ENG) {
    return {
      suffix: engSuffixes[new Intl.PluralRules('en', { type: 'ordinal' }).select(num)],
      tag: 'sup',
    };
  }

  if (lang === LANGS.RUS) {
    return {
      suffix: SHORT_MONTH_NAMES.rus[month - 1],
      tag: 'span',
    };
  }

  return null;
};

export default getOrdinalTranslation;
