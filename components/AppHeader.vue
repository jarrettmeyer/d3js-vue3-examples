<script lang="ts" setup></script>

<template>
  <header id="app-header" class="navbar bg-body-secondary sticky">
    <div class="container">
      <div class="w-100 row">
        <div class="col">
          <NuxtLink to="/" class="navbar-brand">D3.js + Vue 3</NuxtLink>
        </div>
        <div class="col text-end">
          <a
            href="https://github.com/jarrettmeyer/d3js-vue3-examples"
            target="_blank"
            ><BIGithub
          /></a>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
a {
  color: white;
  font-size: 1.25rem;
}

#app-header {
  z-index: 100;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
}
</style>
