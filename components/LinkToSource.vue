<script lang="ts" setup>
const route = useRoute();

const baseUrl = `https://github.com/jarrettmeyer/d3js-vue3-examples/`;

const href = computed(() => {
  const root = `${baseUrl}blob/main/pages`;
  return `${root}${route.path}/index.vue`;
});
</script>

<template>
  <section class="link-to-source">
    <p>
      Source code:
      <a :href="href" target="_blank" rel="noopener noreferrer">
        <BIGithub />
        {{ route.path }}
      </a>
    </p>
  </section>
</template>

<style lang="scss" scoped></style>
