<template>
  <form
    v-click-outside="() => toggleExpanded(false)"
    :class="{expanded: expanded}"
    class="transaction-add-form"
    @submit.prevent="submit"
  >
    <div class="transaction-add-form_trigger">
      <Toggle
        v-model:value="data.isGain"
        :left-label="t('add_loss')"
        :right-label="t('add_gain')"
      />

      <FormInput
        v-model:value="data.name"
        no-label
        :placeholder="data.isGain ? t('add_new_gain_name') : t('add_new_loss_name')"
        class="simple"
        required
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
        :placeholder="t('add_price')"
        class="simple"
        required
        @focusin="() => toggleExpanded(true)"
      >
        <template #after>
          <div class="form-input_icon">
            {{ activeCurrency.label }}
          </div>
        </template>
      </FormInput>

      <Button look="add">+</Button>
    </div>

    <div class="transaction-add-form_wrapper">
      <div class="transaction-add-form_menu">
        <div class="transaction-add-form_menu_top">
          <DateInput :date="data.date" @change="data.date = $event" />
          <ButtonChoice
            v-model:value="activeCurrency"
            :items="currencies"
            :label="t('add_currency')"
          />
        </div>

        <div class="transaction-add-form_menu_categories">
          <Category
            v-for="category in categories"
            :key="category.id"
            :color="category.color"
            :name="category.name"
            :class="{current: activeCategory && category.id === activeCategory.id }"
            @click="changeActiveCategory(category)"
          />
        </div>

        <FormInput
          v-model:value="data.description"
          type="textarea"
          :label-text="t('add_additional')"
          :placeholder="data.isGain
            ? t('add_additional_placeholder_gain')
            : t('add_additional_placeholder_loss')"
        />

        <p v-if="error" class="text-regular text-color-error">{{ error }}</p>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import './add-form.css';
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import type { Category as CategoryType } from '../../utils/api/categories';
import type { Currency as CurrencyType } from '../../utils/api/currency';
import useTranslation from '../../utils/useTranslation';
import useStore from '../../store';
import Toggle from '../form/toggle.vue';
import Button from '../button/index.vue';
import FormInput from '../form/form-input.vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg?component';
import Category from '../category/index.vue';
import DateInput from '../form/date-input.vue';
import ButtonChoice from '../form/button-choice.vue';
import api from '../../utils/api';

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
  emits: ['update'],
  setup (props, context) {
    const t = useTranslation();
    const store = useStore();
    const data = reactive({
      isGain: false,
      name: '',
      price: '',
      date: '',
      description: '',
    });
    const categories = computed<CategoryType[]>(() => store.state.categories);
    const currencies = computed<CurrencyType[]>(() => store.state.currencies);
    const activeCategory = ref<CategoryType|null>(categories.value?.[0] || null);
    const activeCurrency = ref<CurrencyType|null>(currencies.value?.[0] || null);

    const error = ref('');
    const expanded = ref(false);

    const clearFields = () => {
      data.isGain = false;
      data.name = '';
      data.price = '';
      data.date = '';
      data.description = '';
      activeCurrency.value = currencies.value?.[0] || null;
      activeCategory.value = categories.value?.[0] || null;
    };

    const submit = async () => {
      const preparedData = {
        type: data.isGain ? 'gain' : 'loss',
        title: data.name,
        price: data.price,
        date: data.date,
        description: data.description,
        currency: activeCurrency.value.id,
        category: activeCategory.value.id,
        isTemplate: false,
      };

      try {
        await api.transactions.create(preparedData);
        clearFields();
        context.emit('update');
      } catch (e) {
        console.error(e);
        error.value = t('add_error');
      }
    };

    const changeActiveCategory = (val: CategoryType) => {
      activeCategory.value = val;
    };

    const toggleExpanded = (val?: boolean) => {
      if (typeof val === 'undefined') {
        expanded.value = !expanded.value;
      } else {
        expanded.value = val;
      }
    };

    return {
      t,
      data,
      expanded,
      error,
      submit,
      toggleExpanded,
      activeCategory,
      activeCurrency,
      currencies: currencies.value,
      categories: categories.value,
      changeActiveCategory,
    };
  },
});
</script>
