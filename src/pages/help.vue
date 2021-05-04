<template>
  <section class="help-page container">
    <article>
      <template v-for="(block, i) in userDocs.blocks">
        <template v-if="block.type === 'paragraph'">
          <p :key="i" v-html="translate(block.data.text)" />
        </template>

        <template v-if="block.type === 'header'">
          <component
            :is="'h' + block.data.level"
            :id="block.data.slug || ''"
            :key="i"
            v-html="translate(block.data.text)"
          />
        </template>

        <template v-if="block.type === 'list'">
          <component :is="block.data.style === 'ordered' ? 'ol' : 'ul'" :key="i">
            <li
              v-for="(item, j) in block.data.items"
              :key="j"
              v-html="translate(item)"
            />
          </component>
        </template>

        <template v-if="block.type === 'image'">
          <figure :key="i">
            <img :src="block.data.url" alt="" />
            <figcaption v-html="translate(block.data.caption)" />
          </figure>
        </template>
      </template>
    </article>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/help.css';
import { defineComponent } from 'vue';
import useTranslation from '../utils/useTranslation';
import userDocs from '../utils/user-docs';

export default defineComponent({
  name: 'HomePage',
  components: { },
  setup () {
    const t = useTranslation();

    const translate = (data: { default: string }): string => data.default;

    return {
      t,
      userDocs,
      translate,
    };
  },
});
</script>
