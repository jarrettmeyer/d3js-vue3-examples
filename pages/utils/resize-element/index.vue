<script lang="ts" setup>
const innerRef = ref<HTMLDivElement | null>(null);
const { height, width } = useResizeObserver(innerRef);
</script>

<template>
  <h1>Resize Element</h1>
  <p class="lead">
    This example uses the <code>ResizeObserver</code> API to react to changes in
    an element's size.
  </p>

  <p>
    In normal usage, a visual will not be resized with CSS
    <code>resize: both</code>. Instead, the visual will be reactive to the
    browser.
  </p>

  <div class="wrapper bg-body-secondary p-3">
    <div class="resize bg-body-tertiary p-3" ref="innerRef">
      <p><strong>Width:</strong> {{ width }}</p>
      <p><strong>Height:</strong> {{ height }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resize {
  width: 20rem;
  height: 12rem;
  min-width: 5rem;
  min-height: 3rem;
  max-width: 48rem;
  max-height: 28rem;
}

.wrapper {
  width: 50rem;
  height: 30rem;

  p {
    margin-bottom: 0;
    white-space: nowrap;
  }
}
</style>
