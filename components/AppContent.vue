<script lang="ts" setup></script>

<template>
  <div id="app-content" class="container content-layout py-4">
    <aside>
      <AppMenu />
    </aside>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.content-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "aside main";
}
</style>
