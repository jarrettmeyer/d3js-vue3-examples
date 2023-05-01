<script lang="ts" setup>
const innerRef = ref<HTMLDivElement | null>(null);
const { height, width } = useResizeObserver(innerRef);
</script>

<template>
  <h1>Resize SVG</h1>

  <p class="lead">
    Resizing an SVG is functionally the same as
    <NuxtLink to="/utils/resize-element">resizing any other element</NuxtLink>.
    Stylistically, the width and height are both set to 100%.
  </p>

  <div class="wrapper bg-body-secondary">
    <div class="resize bg-white" ref="innerRef">
      <svg :width="width" :height="height">
        <g transform="translate(16, 16)" font-size="16">
          <text y="16">
            <tspan>width:</tspan>
            {{ width }}
          </text>
          <text :y="40">
            <tspan>height:</tspan>
            {{ height }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}

.resize {
  width: 20rem;
  height: 12rem;
  min-width: 5rem;
  min-height: 3rem;
  max-width: 50rem;
  max-height: 30rem;
}

.wrapper {
  width: 50rem;
  height: 30rem;
}
</style>
