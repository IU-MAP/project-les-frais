<template>
  <form
    class="transaction-add-form category-add-form"
    :class="{edit}"
    @submit.prevent="submit"
  >
    <div class="transaction-add-form_trigger">
      <div class="category-add-form_row">
        <Button look="remove" @click="remove"><TrashIcon /></Button>

        <FormInput
          v-model:value="data.name"
          no-label
          placeholder="New category name"
          class="simple"
        />

        <Button look="add">
          <CheckIcon v-if="edit" />
          <PlusIcon v-else />
        </Button>
      </div>
      <div class="category-add-form_row category-choice">
        <span class="text-regular">{{ t('settings_tab_categories_color') }}:</span>
        <Dot
          v-for="i in 26"
          :key="i"
          :number="i"
          :checked="i === parseInt(data.color)"
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
import {
  defineComponent, PropType, reactive, ref, watchEffect,
} from 'vue';
import type { Category } from '../../utils/api/categories';
import useTranslation from '../../utils/useTranslation';
import api from '../../utils/api';
import { store } from '../../store';
import Button from '../button/index.vue';
import FormInput from '../form/form-input.vue';
import Dot from '../dot/index.vue';
import TrashIcon from '../../assets/icons/trash.svg';
import CheckIcon from '../../assets/icons/check.svg';
import PlusIcon from '../../assets/icons/plus.svg';

export default defineComponent({
  name: 'CategoryAddForm',
  components: {
    Dot,
    FormInput,
    Button,
    TrashIcon,
    PlusIcon,
    CheckIcon,
  },
  props: {
    edit: {
      type: Object as PropType<Category>,
      default: null,
    },
  },
  emits: ['edited'],
  setup (props, context) {
    const t = useTranslation();

    const data = reactive({
      name: props.edit?.name || '',
      color: props.edit?.color || 1,
    });

    const activeCategory = ref('Food');

    const clearFields = () => {
      data.name = '';
      data.color = 1;
    };

    const submit = async () => {
      if (props.edit) {
        const res = await api.category.patch(props.edit.id, {
          name: data.name,
          color: data.color,
        });

        if (res) {
          clearFields();
          await store.dispatch('changeCategories');
          context.emit('edited');
        }
      } else {
        const res = await api.category.create({
          name: data.name,
          color: data.color,
        });

        if (res) {
          clearFields();
          await store.dispatch('changeCategories');
          if (props.edit) context.emit('edited');
        }
      }
    };

    const remove = async () => {
      await api.category.remove(props.edit.id);
      await store.dispatch('changeCategories');
      clearFields();
      context.emit('edited');
    };

    const changeActiveCategory = (val: string) => {
      activeCategory.value = val;
    };

    watchEffect(() => {
      if (props.edit) {
        data.name = props.edit.name;
        data.color = props.edit.color;
      }
    });

    return {
      t,
      data,
      submit,
      activeCategory,
      changeActiveCategory,
      remove,
    };
  },
});
</script>
