<template>
  <section>
    <ul class="list-unstyled">
      <li>
        <NuxtLink to="/"><BIHouse /> Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about"><BIInfoCircle /> About</NuxtLink>
      </li>
    </ul>
  </section>

  <h5 class="text-body-emphasis">
    <BITools />
    Utils
  </h5>
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

  <h5 class="text-body-emphasis"><BIBarChart /> Visuals</h5>
  <ul class="list-unstyled ps-2">
    <li>
      <NuxtLink to="/visuals/static-bar-chart">Static Bar Chart</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/visuals/simple-animation">Simple Animation</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/visuals/line-chart">Line Chart</NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
a {
  font-weight: normal;
  text-decoration: none;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

svg {
  margin-right: 0.25rem;
}

.router-link-exact-active {
  font-weight: bold;
}
</style>
