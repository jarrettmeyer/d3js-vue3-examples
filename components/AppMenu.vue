<template>
  <section>
    <ul class="list-unstyled">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">About</NuxtLink>
      </li>
    </ul>
  </section>

  <h5 class="text-body-emphasis">Utils</h5>
  <ul class="list-unstyled ps-2">
    <li>
      <NuxtLink to="/utils/resize-element">Resize Element</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/utils/resize-svg">Resize SVG</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/utils/preserve-aspect-ratio"
        >Preserve Aspect Ratio</NuxtLink
      >
    </li>
  </ul>

  <h5 class="text-body-emphasis">Visuals</h5>
  <ul class="list-unstyled ps-2">
    <li>
      <NuxtLink to="/visuals/static-bar-chart">Static Bar Chart</NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
a {
  font-weight: normal;
  text-decoration: none;
}

.router-link-exact-active {
  font-weight: bold;
}
</style>
