<template>
  <form
    :class="{expanded: data.expanded}"
    class="transaction-add-form"
    @submit.prevent="submit"
    v-click-outside="() => toggleExpanded(false)"
  >
    <div class="transaction-add-form_trigger">
      <Toggle
        v-model:value="data.isGain"
        left-label="Loss"
        right-label="Gain"
      />

      <FormInput
        v-model:value="data.name"
        no-label
        placeholder="New expense name"
        class="simple"
        @focusin="() => toggleExpanded(true)"
      >
        <template #after>
          <div class="form-input_icon">
            <ChevronIcon />
          </div>
        </template>
      </FormInput>

      <FormInput
        v-model:value="data.price"
        no-label
        placeholder="Price"
        class="simple"
        @focusin="() => toggleExpanded(true)"
      >
        <template #after>
          <div class="form-input_icon">
            ₽
          </div>
        </template>
      </FormInput>

      <Button look="add">+</Button>
    </div>

    <div class="transaction-add-form_wrapper">
      <div class="transaction-add-form_menu">
        <div class="transaction-add-form_menu_top">
          <DateInput />
          <ButtonChoice label="Currencies" :items="currencies" />
        </div>

        <div class="transaction-add-form_menu_categories">
          <Category
            v-for="category in categories"
            :key="category.id"
            :color="category.color"
            :name="category.name"
            :class="{current: category.id === activeCategory }"
            @click="changeActiveCategory(category.id)"
          />
        </div>

        <FormInput
          v-model:value="data.description"
          type="textarea"
          placeholder="Short info about the expense"
          label-text="Additional description"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import './add-form.css';
import { computed, defineComponent, reactive, ref } from 'vue';
import Toggle from '../form/toggle.vue';
import Button from '../button/index.vue';
import FormInput from '../form/form-input.vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg?component';
import Category from '../category/index.vue';
import DateInput from '../form/date-input.vue';
import ButtonChoice from '../form/button-choice.vue';
import { CURRENCIES } from '../../utils/constants';
import useStore from '../../store';

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
  props: {},
  setup () {
    const store = useStore();
    const data = reactive({
      isGain: false,
      name: '',
      price: '',
      description: '',
      expanded: false,
    });
    const categories = computed<Category[]>(() => store.state.categories);

    const activeCategory = ref('Food');

    const submit = () => {
      console.log(data);
    };

    const changeActiveCategory = (val: string) => {
      activeCategory.value = val;
    };

    const toggleExpanded = (val?: boolean) => {
      if (typeof val === 'undefined') {
        data.expanded = !data.expanded;
      } else {
        data.expanded = val;
      }
    };

    return {
      data,
      submit,
      toggleExpanded,
      activeCategory,
      currencies: Object.values(CURRENCIES),
      categories,
      changeActiveCategory,
    };
  },
});
</script>
