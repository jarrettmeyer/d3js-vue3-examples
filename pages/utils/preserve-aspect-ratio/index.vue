<script lang="ts" setup>
import LinkToSource from "~/components/LinkToSource.vue";

useHead({ title: "Preserve Aspect Ratio | D3.js + Vue 3" });
const alignOptions = ["Min", "Mid", "Max"];
const xAlign = ref("Mid");
const yAlign = ref("Mid");
const meetOrSlice = ref("meet");

const innerRef = ref<HTMLDivElement | null>(null);
const { height, width } = useResizeObserver(innerRef);

const eyeX = ref(35);
const eyeY = ref(-25);
const eyeR = ref(10);

const smileX = ref(50);
const smileY = ref(20);
const smileDepth = ref(60);
const smileCurveX = ref(30);

const smilePath = computed(() => {
  const path: string[] = [];
  path.push(`M${-smileX.value},${smileY.value}`);

  const cp1 = `${-smileCurveX.value},${smileDepth.value}`;
  const cp2 = `${smileCurveX.value},${smileDepth.value}`;
  const pt = `${smileX.value},${smileY.value}`;
  path.push(`C${cp1},${cp2},${pt}`);

  return path.join(" ");
});

const preserveAspectRatio = computed(() => {
  return `x${xAlign.value}Y${yAlign.value} ${meetOrSlice.value}`;
});
</script>

<template>
  <article>
    <h1>Preserve Aspect Ratio</h1>

    <section>
      <p class="lead">
        The <code>preserveAspectRatio</code> attribute is used to specify how an
        SVG should scale to fit a container. It is a string that combines
        position and scaling.
      </p>

      <p>
        The X and Y attributes indicate position. The allowed values are
        <code>min</code>, <code>mid</code>, and <code>max</code>. The merge
        attribute can be either <code>meet</code> or <code>slice</code>. Learn
        more on
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio"
          target="_blank"
          >MDN</a
        >.
      </p>

      <p>In the demo below, the viewbox is 200x200.</p>
    </section>

    <section class="row">
      <div class="col-2">
        <label class="form-label">X</label>
        <select class="form-control" v-model="xAlign">
          <option v-for="option in alignOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="col-2">
        <label class="form-label">Y</label>
        <select class="form-control" v-model="yAlign">
          <option v-for="option in alignOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="col-2">
        <label class="form-label">Merge</label>
        <select class="form-control" v-model="meetOrSlice">
          <option value="meet">meet</option>
          <option value="slice">slice</option>
        </select>
      </div>

      <div class="col-2">
        <label for="" class="form-label">Width</label>
        <input
          type="text"
          class="form-control-plaintext"
          readonly
          :value="width"
        />
      </div>

      <div class="col-2">
        <label for="" class="form-label">Height</label>
        <input
          type="text"
          class="form-control-plaintext"
          readonly
          :value="height"
        />
      </div>
    </section>

    <section>
      <div class="wrapper bg-body-secondary">
        <div class="resize bg-white" ref="innerRef">
          <svg viewBox="0 0 200 200" :preserveAspectRatio="preserveAspectRatio">
            <g transform="translate(100,100)">
              <circle cx="0" cy="0" r="90" fill="#ffee44" />
              <circle :cx="-eyeX" :cy="eyeY" :r="eyeR" fill="#000000" />
              <circle :cx="eyeX" :cy="eyeY" :r="eyeR" fill="#000000" />
              <path
                class="smile"
                :d="smilePath"
                stroke="#000000"
                stroke-width="10"
                stroke-linecap="round"
                fill="none"
              />
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
