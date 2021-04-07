import { mount } from '@vue/test-utils';
import Button from './index.vue';

describe('Button', () => {
  it('contains the passed look', () => {
    const look = 'default';
    const wrapper = mount(Button, { props: { look } });

    expect(wrapper.find('button').attributes('class')).toEqual(look);
  });
});
