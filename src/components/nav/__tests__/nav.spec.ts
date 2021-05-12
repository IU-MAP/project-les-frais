import { mount } from '@vue/test-utils';
import Nav from '../index.vue';

jest.mock('../../../utils/useTranslation', () => () => (key: string) => `${key} mock translation`);
jest.mock('../../../store', () => () => ({
  state: {
    user: 'user',
    language: 'eng',
  },
  dispatch: jest.fn(),
}));
describe('Nav', () => {
  describe('when user is logged in', () => {
    it('matches the snapshot', () => {
      const component = mount(Nav);
      expect(component).toMatchSnapshot();
    });
  });

  describe('when user is not logged in', () => {
    jest.mock('../../../store', () => () => ({
      state: {
        user: null,
        language: 'eng',
      },
      dispatch: jest.fn(),
    }));

    it('matches the snapshot', () => {
      const component = mount(Nav);
      expect(component).toMatchSnapshot();
    });
  });
});
