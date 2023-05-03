<script lang="ts" setup>
const resizeRef = ref<HTMLElement | null>(null);
const { width, height } = useResizeObserver(resizeRef);
const cx = ref(25 * 8);
const cy = ref(15 * 8);
const r = ref(10);
const velocity = ref(Math.floor(100 + 100 * Math.random()));
const angleDegrees = ref(Math.floor(360 * Math.random()));
const isAnimating = ref(false);
const lastTick = ref<number | null>(null);
const vxMod = ref(1);
const vyMod = ref(1);

const angleRadians = computed(() => {
  const degrees = angleDegrees.value - 90;
  return (degrees * Math.PI) / 180;
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
  cx.value = width.value / 2;
  cy.value = height.value / 2;
  isAnimating.value = false;
  vxMod.value = 1;
  vyMod.value = 1;
};

const onStart = () => {
  angleDegrees.value = angleDegrees.value % 360;
  isAnimating.value = true;

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
        <label for="input-angle" class="form-label">Angle</label>
        <input
          id="input-angle"
          class="form-control"
          type="number"
          v-model="angleDegrees"
          min="0"
          max="359"
          step="1"
          :disabled="isAnimating"
        />
      </div>
      <div class="col-6">
        <label class="form-label">&nbsp;</label>
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
      </svg>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.resize {
  width: 25rem;
  height: 15rem;
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
