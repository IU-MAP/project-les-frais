import { mount } from '@vue/test-utils';
import AddForm from '../add-form.vue';

jest.mock('../../../utils/useTranslation.ts', () => () => (key: string) => `${key} mock translation`);
describe('Category component', () => {
  it('matches the snapshot', () => {
    const component = mount(AddForm, {
      props: {
        type: {
          id: 1,
          created_at: new Date(1234567),
          name: 'test',
          color: '1',
        },
      },
    });

    expect(component).toMatchSnapshot();
  });
});
