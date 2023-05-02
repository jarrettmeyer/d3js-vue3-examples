<script lang="ts" setup>
useHead({ title: "Static Bar Chart | D3.js + Vue 3" });
const innerRef = ref<HTMLElement | null>(null);

const {
  computedData,
  count,
  height,
  margin,
  paddingInner,
  paddingOuter,
  width,
} = useStaticBarChart(innerRef);
</script>

<template>
  <h1>Static Bar Chart</h1>
  <p class="lead">
    This is an example of a reactive static bar chart. The chart is responsive
    to changes in data, outer padding, inner padding, and SVG size.
  </p>

  <div class="row mb-3">
    <div class="col-3">
      <label class="form-label" for="input-outer-padding">Outer padding</label>
      <input
        id="input-outer-padding"
        type="number"
        class="form-control"
        v-model="paddingOuter"
        min="0"
        max="1"
        step="0.01"
        title="outer padding"
      />
    </div>
    <div class="col-3">
      <label class="form-label" for="input-inner-padding">Inner padding</label>
      <input
        id="input-inner-padding"
        type="number"
        class="form-control"
        v-model="paddingInner"
        min="0"
        max="1"
        step="0.01"
        title="inner padding"
      />
    </div>
    <div class="col-3">
      <label class="form-label" for="input-count">Count</label>
      <input
        id="input-count"
        type="number"
        class="form-control"
        v-model="count"
        min="1"
        max="10"
        step="1"
        title="count"
      />
    </div>
  </div>

  <div class="wrapper bg-body-secondary">
    <div class="resize bg-white" ref="innerRef">
      <svg :width="width" :height="height">
        <g :transform="`translate(${margin},${margin})`">
          <rect
            v-for="d in computedData"
            :key="d.index"
            :x="d.x"
            :y="d.y"
            :width="d.width"
            :height="d.height"
            :fill="d.fill"
            :data-index="d.index"
            :data-label="d.label"
            :data-value="d.value"
          />
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
  width: 25rem;
  height: 15rem;
  min-width: 3rem;
  min-height: 3rem;
  max-width: 50rem;
  max-height: 30rem;
}

.wrapper {
  width: 50rem;
  height: 30rem;
}
</style>
