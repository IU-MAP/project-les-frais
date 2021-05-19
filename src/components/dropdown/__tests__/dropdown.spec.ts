import { mount } from '@vue/test-utils';
import Dropdown from '../index.vue';
import clickOutside from '../../../utils/click-outside';

describe('Dropdown', () => {
  it('renders', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        label: 'Label',
        items: [],
      },
      global: {
        directives: {
          clickOutside,
        },
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
