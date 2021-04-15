<template>
  <form class="transaction-add-form">
    <div class="transaction-add-form_trigger">
      <Toggle />

      <FormInput no-label placeholder="New expense name">
        <template #after>
          <div class="form-input_icon">
            <ChevronIcon />
          </div>
        </template>
      </FormInput>

      <FormInput no-label placeholder="Price">
        <template #after>
          <div class="form-input_icon">
            ₽
          </div>
        </template>
      </FormInput>

      <Button look="submit">+</Button>
    </div>

    <div class="transaction-add-form_wrapper">
      <div class="transaction-add-form_menu">
        <div class="transaction-add-form_menu_top">
          <DateInput />
          <ButtonChoice />
        </div>

        <div class="transaction-add-form_menu_categories">
          <Category color="1" name="Food" />
          <Category color="10" name="Transport" />
          <Category color="20" name="Health" />
        </div>

        <FormInput placeholder="Short info about the expense" label-text="Additional description" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import './add-form.css';
import { defineComponent } from 'vue';
import Toggle from '../form/toggle.vue';
import Button from '../button/index.vue';
import FormInput from '../form/form-input.vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg?component';
import Category from '../category/index.vue';
import DateInput from '../form/date-input.vue';
import ButtonChoice from '../form/button-choice.vue';

export default defineComponent({
  name: 'TransactionAddForm',
  components: {
    ButtonChoice,
    DateInput,
    Category,
    FormInput,
    Button,
    Toggle,
    ChevronIcon,
  },
  props: {
  },
});
</script>
