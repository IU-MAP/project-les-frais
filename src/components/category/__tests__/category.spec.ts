import { mount } from '@vue/test-utils';
import Category from '../index.vue';

describe('Category component', () => {
  it('matches the snapshot', () => {
    const component = mount(Category, {
      props: {
        color: 1,
        name: 'test',
      },
    });

    expect(component).toMatchSnapshot();
  });
});
