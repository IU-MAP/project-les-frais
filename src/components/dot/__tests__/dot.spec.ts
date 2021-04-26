import { mount } from '@vue/test-utils';
import Dot from '../index.vue';

describe('Dot component', () => {
  it('matches snapshots', () => {
    let component = mount(Dot, {
      props: {
        number: 1,
      },
    });
    expect(component).toMatchSnapshot();

    component = mount(Dot, {
      props: {
        number: 1,
        radio: true,
      },
    });
    expect(component).toMatchSnapshot();

    component = mount(Dot, {
      props: {
        number: 1,
        checked: true,
      },
    });
    expect(component).toMatchSnapshot();
  });
});
