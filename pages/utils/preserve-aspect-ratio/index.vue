<script lang="ts" setup>
import LinkToSource from "~/components/LinkToSource.vue";

useHead({ title: "Preserve Aspect Ratio | D3.js + Vue 3" });
const alignOptions = ["Min", "Mid", "Max"];
const xAlign = ref("Mid");
const yAlign = ref("Mid");
const meetOrSlice = ref("meet");

const innerRef = ref<HTMLDivElement | null>(null);
const { height, width } = useResizeObserver(innerRef);

const preserveAspectRatio = computed(() => {
  return `x${xAlign.value}Y${yAlign.value} ${meetOrSlice.value}`;
});
</script>

<template>
  <h1>Preserve Aspect Ratio</h1>

  <p class="lead">
    The <code>preserveAspectRatio</code> attribute is used to specify how an SVG
    should scale to fit a container. It is a string that combines position and
    scaling.
  </p>

  <p>
    The X and Y attributes indicate position. The allowed values are
    <code>min</code>, <code>mid</code>, and <code>max</code>. The merge
    attribute can be either <code>meet</code> or <code>slice</code>.
  </p>

  <p>In the demo below, the viewbox is 200x200.</p>

  <div class="row mb-3">
    <div class="col-3">
      <label class="form-label">X</label>
      <select class="form-control" v-model="xAlign">
        <option v-for="option in alignOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="col-3">
      <label class="form-label">Y</label>
      <select class="form-control" v-model="yAlign">
        <option v-for="option in alignOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="col-3">
      <label class="form-label">Merge</label>
      <select class="form-control" v-model="meetOrSlice">
        <option value="meet">meet</option>
        <option value="slice">slice</option>
      </select>
    </div>
  </div>

  <div class="row mb-3">
    <p class="mb-0"><strong>width:</strong> {{ width }}</p>
    <p class="mb-0"><strong>height:</strong> {{ height }}</p>
  </div>

  <div class="wrapper bg-body-secondary">
    <div class="resize bg-white" ref="innerRef">
      <svg viewBox="0 0 200 200" :preserveAspectRatio="preserveAspectRatio">
        <g transform="translate(100,100)">
          <circle cx="0" cy="0" r="90" fill="#ffee44" />
          <circle cx="-40" cy="-30" r="5" fill="#000000" />
          <circle cx="40" cy="-30" r="5" fill="#000000" />
          <path
            d="M-50,20 C-30,50,30,50,50,20"
            stroke="#000000"
            stroke-width="10"
            stroke-linecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  </div>

  <LinkToSource />
</template>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}

.resize {
  width: 20rem;
  height: 12rem;
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
