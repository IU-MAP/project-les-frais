import { mount } from '@vue/test-utils';
import Tabs from '../index.vue';

describe('Tabs', () => {
  it('matches the shapshot', () => {
    const component = mount(Tabs, { props: { items: ['item1', 'item2'], initial: 'item1' } });
    expect(component).toMatchSnapshot();
  });
});
