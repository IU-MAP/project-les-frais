import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AddForm from '../add-form.vue';

const store = createStore({
  state () {
    return {
      language: 'eng',
    };
  },
});

describe('Category component', () => {
  xit('matches the snapshot', () => {
    const component = mount(AddForm, {
      props: {
        type: {
          id: 1,
          created_at: new Date(1234567),
          name: 'test',
          color: '1',
        },
      },
      global: {
        plugins: [store],
      },
    });

    expect(component).toMatchSnapshot();
  });
});
