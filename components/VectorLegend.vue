<script lang="ts" setup>
export interface VectorLegendProps {
  color?: string;
  fontSize?: number;
  radius?: number;
}

const props = defineProps<VectorLegendProps>();

const lines = new Array(6).fill(0).map((_, i) => {
  const angleDeg = i * 30;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x1 = Math.cos(angleRad);
  const y1 = Math.sin(angleRad);
  const x2 = Math.cos(angleRad + Math.PI);
  const y2 = Math.sin(angleRad + Math.PI);
  return { x1, y1, x2, y2 };
});

const color = computed(() => props.color ?? "darkgray");

const fontSize = computed(() => props.fontSize ?? 8);

const radius = computed(() => props.radius ?? 16);
</script>

<template>
  <g class="vector-legend">
    <g :stroke="color" stroke-linecap="round">
      <line
        v-for="(line, index) in lines"
        :key="index"
        :x1="radius * line.x1"
        :y1="radius * line.y1"
        :x2="radius * line.x2"
        :y2="radius * line.y2"
      />
      <circle :r="0.75 * radius" fill="white" stroke="none" />
    </g>
    <g :fill="color" :font-size="fontSize">
      <text text-anchor="start" :x="radius + 4" :y="fontSize * 0.3">0</text>
      <text text-anchor="middle" :x="0" :y="radius + fontSize">90</text>
      <text text-anchor="end" :x="-radius - 4" :y="fontSize * 0.3">180</text>
      <text text-anchor="middle" :x="0" :y="-radius - 4">270</text>
    </g>
  </g>
</template>
