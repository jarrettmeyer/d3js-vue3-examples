<script lang="ts" setup>
import { deg2Rad, rad2Deg } from "../../utils";

const resizeRef = ref<HTMLElement | null>(null);
const { width, height } = useResizeObserver(resizeRef);
const cx = ref(25 * 8);
const cy = ref(15 * 8);
const r = ref(10);
const velocity = ref(Math.floor(100 + 100 * Math.random()));
const angleDegrees = ref(90); // ref(Math.floor(360 * Math.random()));
const isAnimating = ref(false);
const isMoved = ref(false);
const lastTick = ref<number | null>(null);
const vxMod = ref(1);
const vyMod = ref(1);

const angleRadians = computed(() => {
  return deg2Rad(angleDegrees.value);
});

const arrowPathD = computed(() => {
  return [
    `M0,0`,
    `h${2.5 * r.value}`,
    `l${-0.5 * r.value},${0.5 * r.value}`,
    `v${-r.value}`,
    `l${0.5 * r.value},${0.5 * r.value}`,
    `z`,
  ].join(" ");
});

const arrowTransform = computed(() => {
  const rx = vxMod.value * Math.cos(angleRadians.value);
  const ry = vyMod.value * Math.sin(angleRadians.value);

  // let rotate =  angleDegrees.value;
  // if (vxMod.value < 0) {
  //   rotate += 180;
  // }
  // if (vyMod.value < 0) {
  //   rotate += 180;
  // }
  return `translate(${cx.value},${cy.value}) rotate(${rad2Deg(
    Math.atan(ry / rx)
  )})`;
});

const vx = computed(
  () => velocity.value * vxMod.value * Math.cos(angleRadians.value)
);

const vy = computed(
  () => velocity.value * vyMod.value * Math.sin(angleRadians.value)
);

const minX = computed(() => r.value);

const minY = computed(() => r.value);

const maxX = computed(() => width.value - r.value);

const maxY = computed(() => height.value - r.value);

const onReset = () => {
  isAnimating.value = false;
  isMoved.value = false;
  cx.value = width.value / 2;
  cy.value = height.value / 2;
  vxMod.value = 1;
  vyMod.value = 1;
};

const onStart = () => {
  angleDegrees.value = angleDegrees.value % 360;
  isAnimating.value = true;
  isMoved.value = true;

  const animate = (t: number) => {
    if (isAnimating.value) {
      // Velocity is in pixels per second. So we need to know how many seconds
      // have passed since the last animation frame.
      const secondsPassed = (t - (lastTick.value ?? t)) / 1000;
      const dx = secondsPassed * vx.value;
      const dy = secondsPassed * vy.value;

      // Update the ball's position.
      cx.value += dx;
      cy.value += dy;

      // Edge detection.
      if (cx.value < minX.value) {
        vxMod.value *= -1;
        cx.value = minX.value;
      } else if (cx.value > maxX.value) {
        vxMod.value *= -1;
        cx.value = maxX.value;
      }
      if (cy.value < minY.value) {
        vyMod.value *= -1;
        cy.value = minY.value;
      } else if (cy.value > maxY.value) {
        vyMod.value *= -1;
        cy.value = maxY.value;
      }

      lastTick.value = t;
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

const onStop = () => {
  isAnimating.value = false;
  lastTick.value = null;
};

watch([height, width], () => {
  if (!isMoved.value) {
    onReset();
  }
});
</script>

<template>
  <h1>Simple Animation</h1>

  <p class="lead">Let's create a simple animation.</p>

  <section class="mb-4">
    <div class="row">
      <div class="col-3">
        <label for="input-velocity" class="form-label">Velocity</label>
        <input
          id="input-velocity"
          class="form-control"
          type="number"
          v-model="velocity"
          min="0"
          max="1000"
          step="1"
        />
      </div>
      <div class="col-3">
        <label for="input-angle" class="form-label">Initial Angle (deg)</label>
        <input
          id="input-angle"
          class="form-control"
          type="number"
          v-model="angleDegrees"
          min="0"
          max="359"
          step="1"
        />
      </div>
      <div class="col-6">
        <label class="form-label">
          <!-- -->
        </label>
        <div>
          <button
            class="btn btn-primary me-2"
            @click="onReset"
            :disabled="isAnimating"
          >
            Reset
          </button>
          <button
            class="btn btn-success me-2"
            @click="onStart"
            :disabled="isAnimating"
          >
            Start
          </button>
          <button
            class="btn btn-danger"
            @click="onStop"
            :disabled="!isAnimating"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="wrapper mb-4 bg-body-secondary">
    <div class="resize bg-white" ref="resizeRef">
      <svg :width="width" :height="height">
        <circle class="ball" :cx="cx" :cy="cy" :r="r" />
        <path
          class="arrow"
          :transform="arrowTransform"
          :d="arrowPathD"
          stroke="black"
          fill="none"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.resize {
  width: 25rem;
  height: 15rem;
  min-width: 5rem;
  min-height: 5rem;
  max-width: 50rem;
  max-height: 30rem;
}

.wrapper {
  width: 50rem;
  height: 30rem;
}
</style>
