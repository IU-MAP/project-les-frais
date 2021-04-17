import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Button from '../index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: {
        template: 'Welcome to the Les Frais',
      },
    },
    {
      path: '/login',
      component: {
        template: 'Login',
      },
    },
  ],
});

describe('Button', () => {
  describe('when link is not provided', () => {
    it('matches the snapshot', async () => {
      router.push('/');
      await router.isReady();
      const look = 'default';
      const wrapper = mount(Button, {
        props: { look },
        global: {
          plugins: [router],
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  
    it('emits event on click', async () => {
      router.push('/');
      await router.isReady();
      const look = 'default';
      const wrapper = mount(Button, {
        props: { look },
        global: {
          plugins: [router],
        },
      });
      wrapper.trigger('click');
      expect(wrapper.emitted()).toHaveProperty('click');
    });
  });

  describe('when link id provided', () => {
    const conf = {
      props: { look: 'default', link: '/login' },
      global: {
        plugins: [router],
      },
    };
    it('matches the snapshot', async () => {
      router.push('/');
      await router.isReady();
      const wrapper = mount(Button, conf);
      expect(wrapper).toMatchSnapshot();
    });

    it('has the link from the props', async () => {
      router.push('/');
      await router.isReady();
      const wrapper = shallowMount(Button, conf);
      expect(wrapper.html()).toContain('to="/login"');
    });
  });
});
