<script lang="ts" setup>
useHead({ title: "Resize SVG | D3.js + Vue 3" });
const innerRef = ref<HTMLDivElement | null>(null);
const { height, width } = useResizeObserver(innerRef);
</script>

<template>
  <article>
    <h1>Resize SVG</h1>

    <section>
      <p class="lead">
        Resizing an SVG is functionally the same as
        <NuxtLink to="/utils/resize-element"
          >resizing any other element</NuxtLink
        >. We are resizing a wrapper <code>div</code> element. The SVG is set to
        100% width and height of the wrapper element.
      </p>
    </section>

    <section>
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
    </section>

    <LinkToSource />
  </article>
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
