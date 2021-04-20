import { mount } from '@vue/test-utils';
import FormInput from '../form-input.vue';

describe('FormInput', () => {
  const setupWrapper = (props: any) => mount(FormInput, {
    ...props,
  });
  describe('when it has no label', () => {
    const component = setupWrapper({ noLabel: true });
    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot();
    });

    it('emits focusin and focusout events', async () => {
      await component.find('input').trigger('focusin');
      expect(component.emitted()).toHaveProperty('focusin');
      await component.find('input').trigger('focusout');
      expect(component.emitted()).toHaveProperty('focusout');
    });
  });

  describe('when it has label', () => {
    const component = setupWrapper({ labelText: 'label' });
    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when it has the basic HTML attributes', () => {
    const component = setupWrapper({
      type: 'email',
      autocomplete: 'on',
      placeholder: 'google@innopolis.university',
      required: true,
      disabled: true,
    });
    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});
