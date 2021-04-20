<template>
  <div
    :class="{'menu-open': menuOpen}"
    class="transaction"
    v-click-outside="() => toggleMenu(false)"
  >
    <ul class="menu">
      <li @click="edit">{{ t('dashboard_transaction_edit') }}</li>
      <li @click="select">{{ t('dashboard_transaction_select') }}</li>
      <li class="text-color-error" @click="remove">{{ t('dashboard_transaction_remove') }}</li>
    </ul>

    <MoreIcon class="more" @click="() => toggleMenu()" />
    <p class="title">{{ transaction.title }}</p>

    <Category
      v-if="transaction.category"
      :color="transaction.category.color"
      :name="transaction.category.name"
    />

    <span :class="{income: transaction.type === 'gain'}" class="price">
      {{ price }}
    </span>
  </div>
</template>

<script lang="ts">
import './transaction.css';
import {
  defineComponent, PropType, ref, computed,
} from 'vue';
import type { Transaction } from '../../utils/api/transactions';
import useTranslation from '../../utils/useTranslation';
import Category from '../category/index.vue';
import MoreIcon from '../../assets/icons/more.svg?component';

export default defineComponent({
  name: 'Transaction',
  components: {
    Category,
    MoreIcon,
  },
  props: {
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
  },
  emits: ['select', 'edit', 'remove'],
  setup (props, context) {
    const t = useTranslation();

    const menuOpen = ref(false);
    const price = computed(() => {
      const currency = props.transaction.currency.label;
      const amount = props.transaction.type === 'loss' ? `-${props.transaction.price}` : props.transaction.price;
      return `${amount}${currency}`;
    });

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

    return {
      t,
      menuOpen,
      price,
      toggleMenu,
      select,
      edit,
      remove,
    };
  },
});
</script>
