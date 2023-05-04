<script lang="ts" setup>
const route = useRoute();

const baseUrl = `https://github.com/jarrettmeyer/d3js-vue3-examples/`;

const href = computed(
  () => `${baseUrl}blob/main/pages/${route.path}/index.vue`
);
</script>

<template>
  <section class="link-to-source">
    <a :href="href">
      <BIGithub />
      {{ route.path }}
    </a>
  </section>
</template>

<style lang="scss" scoped>
.link-to-source {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
