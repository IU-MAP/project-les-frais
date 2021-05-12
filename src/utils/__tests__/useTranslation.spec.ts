import useTranslation from '../useTranslation';

jest.mock('../translations', () => ({
  langs_rus: {
    rus: 'Русский',
    eng: 'Russian',
  },
}));

jest.mock('../../store', () => () => ({
  state: {
    language: 'eng',
  },
}));

describe('useTranslation', () => {
  it('returns corret t translation', () => {
    const t = useTranslation();

    expect(t('langs_rus')).toEqual('Russian');
  });
});
