<template>
  <form
    class="transaction-add-form category-add-form"
    @submit.prevent="submit"
  >
    <div class="transaction-add-form_trigger">
      <div class="category-add-form_row">
        <FormInput
          v-model:value="data.name"
          no-label
          placeholder="New category name"
          class="simple"
        />

        <Button look="add">+</Button>
      </div>
      <div class="category-add-form_row category-choice">
        <span class="text-regular">Color:</span>
        <Dot
          v-for="i in 26"
          :key="i"
          :number="i"
          :checked="i === data.color"
          radio
          @change="data.color = i"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import '../transactions/add-form.css';
import './add-form.css';
import { defineComponent, reactive, ref } from 'vue';
import Button from '../button/index.vue';
import FormInput from '../form/form-input.vue';
import Dot from '../dot/index.vue';
import api from '../../utils/api';
import {store} from '../../store';

export default defineComponent({
  name: 'CategoryAddForm',
  components: {
    Dot,
    FormInput,
    Button,
  },
  props: {
    isCategory: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    const data = reactive({
      name: '',
      color: 1,
    });

    const activeCategory = ref('Food');

    const submit = async () => {
      const res = await api.category.create({
        slug: 'abcde',
        name: data.name,
        color: data.color,
      });

      if (res) {
        await store.dispatch('changeCategories');
      }
    };

    const changeActiveCategory = (val: string) => {
      activeCategory.value = val;
    };

    return {
      data,
      submit,
      activeCategory,
      changeActiveCategory,
    };
  },
});
</script>
