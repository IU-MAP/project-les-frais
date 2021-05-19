<template>
  <form
    v-click-outside="() => toggleExpanded(false)"
    :class="{expanded: expanded || transaction}"
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
        :fake-placeholder="foundTemplate"
        :placeholder="data.isGain ? t('add_new_gain_name') : t('add_new_loss_name')"
        class="simple"
        required
        @focusin="() => toggleExpanded(true)"
        @keyup="templateSubmit"
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
        type="number"
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

      <Button look="add">
        <CheckIcon v-if="transaction" />
        <PlusIcon v-else />
      </Button>
    </div>

    <div class="transaction-add-form_wrapper">
      <div class="transaction-add-form_menu">
        <div class="transaction-add-form_menu_top">
          <DateInput v-if="!isTemplate" :date="data.date" @change="data.date = $event" />
          <div v-else />

          <ButtonChoice
            v-model:value="activeCurrency"
            :items="currencies"
            :label="t('add_currency')"
          />
        </div>

        <div v-if="!data.isGain" class="transaction-add-form_menu_categories">
          <router-link
            v-if="!categories.length"
            :to="{name: 'settings', query: { slug: 'settings_tabs_categories' }}"
            class="text-regular text-link"
          >
            {{ t('add_no_categories') }}
          </router-link>
          <template v-else>
            <Category
              v-for="category in categories"
              :key="category.id"
              :color="category.color"
              :name="category.name"
              :class="{current: activeCategory && category.id === activeCategory.id }"
              @click="changeActiveCategory(category)"
            />
          </template>
        </div>

        <FormInput
          v-if="!isTemplate"
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
  computed, defineComponent, PropType, reactive, ref, 
} from 'vue';
import type { Transaction } from '../../utils/api/transactions';
import type { Category as CategoryType } from '../../utils/api/categories';
import type { Currency as CurrencyType } from '../../utils/api/currency';
import useTranslation from '../../utils/useTranslation';
import useStore from '../../store';
import Toggle from '../form/toggle.vue';
import Button from '../button/index.vue';
import FormInput from '../form/form-input.vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import CheckIcon from '../../assets/icons/check.svg';
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
    PlusIcon,
    CheckIcon,
  },
  props: {
    transaction: {
      type: Object as PropType<Transaction|null>,
      default: null,
    },
    isTemplate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update'],
  setup (props, context) {
    const t = useTranslation();
    const store = useStore();
    const data = reactive({
      isGain: props.transaction?.type === 'gain',
      name: props.transaction?.title || '',
      price: props.transaction?.price || '',
      date: props.transaction?.date || '',
      description: props.transaction?.description || '',
    });
    const categories = computed<CategoryType[]>(() => store.state.categories);
    const templates = computed<Transaction[]>(() => store.state.templates);
    const currencies = computed<CurrencyType[]>(() => store.state.currencies);
    const activeCategory = ref<CategoryType|null>(props.transaction?.category || categories.value?.[0] || null);
    const activeCurrency = ref<CurrencyType|null>(props.transaction?.currency || currencies.value?.[0] || null);

    const foundTemplate = computed<string|null>(() => {
      if (!data.name || props.isTemplate) return null;

      const regex = `^${data.name}`;
      const match: Transaction|null = templates.value
        .find((template: Transaction) => new RegExp(regex, 'i').test(template.title));

      if (!match) return null;
      return data.name + match.title.slice(data.name.length);
    });

    const error = ref('');
    const expanded = ref(false);

    const toggleExpanded = (val?: boolean) => {
      if (typeof val === 'undefined') {
        expanded.value = !expanded.value;
      } else {
        expanded.value = val;
      }
    };

    const clearFields = () => {
      data.isGain = false;
      data.name = '';
      data.price = '';
      data.date = '';
      data.description = '';
      activeCurrency.value = currencies.value?.[0] || null;
      activeCategory.value = categories.value?.[0] || null;
      toggleExpanded(false);
    };

    const submit = async () => {
      const preparedData = {
        type: (data.isGain ? 'gain' : 'loss') as 'gain'|'loss',
        title: data.name,
        price: data.price,
        date: props.isTemplate ? null : data.date,
        description: data.description,
        currency: activeCurrency.value.id,
        category: activeCategory.value.id,
        isTemplate: props.isTemplate,
      };

      try {
        let newTransaction: Transaction;
        if (props.transaction) newTransaction = await api.transactions.update(props.transaction.id, preparedData);
        else newTransaction = await api.transactions.create(preparedData);
        clearFields();
        context.emit('update', newTransaction);
      } catch (e) {
        console.error(e);
        error.value = t('add_error');
      }
    };

    const changeActiveCategory = (val: CategoryType) => {
      activeCategory.value = val;
    };

    const templateSubmit = (e: KeyboardEvent) => {
      if ((e.key !== 'Enter' && e.key !== 'ArrowRight') || !foundTemplate.value) return;
      e.preventDefault();

      const match: Transaction|null = templates.value
        .find((template: Transaction) => new RegExp(`^${data.name}`, 'i').test(template.title));
      if (!match) return;

      data.name = match.title;
      data.price = match.price;
      data.isGain = match.type === 'gain';
      data.description = match.description;
      activeCategory.value = match.category;
      activeCurrency.value = match.currency;
    };

    return {
      t,
      data,
      expanded,
      error,
      activeCategory,
      activeCurrency,
      foundTemplate,
      currencies: currencies.value,
      categories: categories.value,
      submit,
      toggleExpanded,
      templateSubmit,
      changeActiveCategory,
    };
  },
});
</script>
