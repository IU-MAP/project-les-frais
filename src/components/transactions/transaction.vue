<template>
  <div
    :class="{'menu-open': menuOpen}"
    class="transaction"
    v-click-outside="() => toggleMenu(false)"
  >
    <ul class="menu">
      <li @click="edit">Edit</li>
      <li @click="select">Select</li>
      <li class="text-color-error" @click="remove">Remove</li>
    </ul>

    <MoreIcon class="more" @click="() => toggleMenu()" />
    <p class="title">{{ transaction.title }}</p>
    <Category color="2" name="Food" />
    <span :class="{income: transaction.type === 'gain'}" class="price">
      {{ transaction.type === 'loss' ? `-${transaction.price}` : transaction.price }}{{ '₽' }}
    </span>
  </div>
</template>

<script lang="ts">
import './transaction.css';
import { defineComponent, PropType, ref } from 'vue';
import type { Transaction } from '../../utils/api/transactions';
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
    const menuOpen = ref(false);

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
      menuOpen,
      toggleMenu,
      select,
      edit,
      remove,
    };
  },
});
</script>
