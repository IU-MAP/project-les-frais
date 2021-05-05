<template>
  <div
    v-if="!editing"
    v-click-outside="() => toggleMenu(false)"
    :class="{'menu-open': menuOpen}"
    class="transaction"
  >
    <ul class="menu" @click.stop>
      <li @click="edit">{{ t('dashboard_transaction_edit') }}</li>
      <li v-if="!isTemplate" @click="select">{{ t('dashboard_transaction_select') }}</li>
      <li class="text-color-error" @click="remove">{{ t('dashboard_transaction_remove') }}</li>
    </ul>

    <MoreIcon class="more" @click="() => toggleMenu()" />
    <p class="title">{{ transaction.title }}</p>

    <Category
      v-if="transaction.category && !isGain"
      :color="transaction.category.color"
      :name="transaction.category.name"
    />

    <span :class="{income: isGain}" class="price">
      {{ price }}
    </span>
  </div>

  <TransactionAddForm
    v-else
    :transaction="transaction"
    :is-template="isTemplate"
    @update="sendUpdate"
  />
</template>

<script lang="ts">
import './transaction.css';
import {
  defineComponent, PropType, ref, computed,
} from 'vue';
import type { Transaction } from '../../utils/api/transactions';
import useTranslation from '../../utils/useTranslation';
import Category from '../category/index.vue';
import MoreIcon from '../../assets/icons/more.svg';
import TransactionAddForm from './add-form.vue';

export default defineComponent({
  name: 'Transaction',
  components: {
    TransactionAddForm,
    Category,
    MoreIcon,
  },
  props: {
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    isTemplate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select', 'edit', 'remove', 'update'],
  setup (props, context) {
    const t = useTranslation();

    const menuOpen = ref(false);
    const price = computed(() => {
      const currency = props.transaction.currency.label;
      const amount = props.transaction.type === 'loss' ? `-${props.transaction.price}` : props.transaction.price;
      return `${amount}${currency}`;
    });
    const isGain = computed(() => props.transaction.type === 'gain');

    const toggleMenu = (val?: boolean) => {
      if (typeof val === 'undefined') {
        menuOpen.value = !menuOpen.value;
      } else {
        menuOpen.value = val;
      }
    };

    const select = () => {
      toggleMenu(false);
      context.emit('select');
    };

    const edit = () => {
      toggleMenu(false);
      context.emit('edit');
    };

    const remove = () => {
      toggleMenu(false);
      context.emit('remove');
    };

    const sendUpdate = (newTransaction: Transaction) => {
      context.emit('update', newTransaction);
    };

    return {
      t,
      menuOpen,
      price,
      isGain,
      toggleMenu,
      select,
      edit,
      remove,
      sendUpdate,
    };
  },
});
</script>
