<script lang="ts" setup>
import * as d3 from "d3";

// Update the page title.
useHead({ title: "Simple Animation | D3.js + Vue 3" });

const resizeRef = ref<HTMLElement | null>(null);
const { width, height } = useResizeObserver(resizeRef);

const bounceCounter = ref(0);
const color = ref(d3.interpolateRainbow(Math.random()));

const cx = ref(25 * 8);
const cy = ref(15 * 8);
const r = ref(10);
const velocity = ref(200);
const initialAngleDeg = ref(60);
const isAnimating = ref(false);
const isMoved = ref(false);
const lastTick = ref<number | null>(null);

const initialAngleRad = computed(() => {
  return (initialAngleDeg.value * Math.PI) / 180;
});

/**
 * The vx modifier indicates when the ball has bounced off the left or right edges.
 */
const vxMod = ref(1);

/**
 * The vy modifier indicates when the ball has bounced off the top or bottom edges.
 */
const vyMod = ref(1);

/**
 * Draw an arrow from the center of the ball in the direction of 0°.
 */
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

/**
 * It is much simpler to rotate the arrow around the center of the ball than to
 * recalculate the path positions every time the ball bounces.
 */
const arrowTransform = computed(() => {
  return `translate(${cx.value},${cy.value}) rotate(${velocityAngleDeg.value})`;
});

const vx = computed(
  () => velocity.value * vxMod.value * Math.cos(initialAngleRad.value)
);

const vy = computed(
  () => velocity.value * vyMod.value * Math.sin(initialAngleRad.value)
);

const velocityAngleRad = computed(() => {
  let radians = Math.atan(vy.value / vx.value);
  if (radians < 0) {
    radians += Math.PI;
  }
  if (vy.value < 0) {
    radians += Math.PI;
  }
  return radians;
});

const velocityAngleDeg = computed(() => {
  let degrees = (velocityAngleRad.value * 180) / Math.PI;
  return degrees;
});

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
  initialAngleDeg.value = initialAngleDeg.value % 360;
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
        bounceCounter.value += 1;
      } else if (cx.value > maxX.value) {
        vxMod.value *= -1;
        cx.value = maxX.value;
      }
      if (cy.value < minY.value) {
        vyMod.value *= -1;
        cy.value = minY.value;
        bounceCounter.value += 1;
      } else if (cy.value > maxY.value) {
        vyMod.value *= -1;
        cy.value = maxY.value;
        bounceCounter.value += 1;
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

watch([bounceCounter], () => {
  color.value = d3.interpolateRainbow(Math.random());
});
</script>

<template>
  <h1>Simple Animation</h1>

  <p class="lead">Let's create a simple animation of a bouncing ball.</p>

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
          v-model="initialAngleDeg"
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
        <VectorLegend transform="translate(40,32)" />
        <circle
          class="ball"
          :cx="cx"
          :cy="cy"
          :r="r"
          :fill="color"
          stroke="none"
        />
        <path
          class="arrow"
          :transform="arrowTransform"
          :d="arrowPathD"
          :stroke="color"
          :fill="color"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </section>

  <section>
    <p><strong>Center:</strong> ({{ cx.toFixed(2) }}, {{ cy.toFixed(2) }})</p>
    <p>
      <strong>Velocity vector:</strong> ({{ vx.toFixed(2) }},
      {{ vy.toFixed(2) }})
    </p>
    <p>
      <strong>Velocity angle:</strong> {{ velocityAngleRad.toFixed(4) }} radians
      or {{ velocityAngleDeg.toFixed(2) }}°
    </p>
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
