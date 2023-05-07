<script lang="ts" setup>
import * as d3 from "d3";

useHead({ title: "Line Chart" });

interface LineChartDatum {
  index: number;
  x: number;
  y: number;
}

const aspectRatio = 9 / 5;
const svgRef = ref<SVGSVGElement | null>(null);
const { width: svgWidth, height: svgHeight } = useResizeObserver(svgRef);
const cursorPosition = reactive(useCursorPosition(svgRef));
const n = ref(11);
const color = ref("#000000");

const data: LineChartDatum[] = reactive([]);

const svgViewBox = computed(() => `0 0 ${svgWidth.value} ${svgHeight.value}`);

const gGraphMargin = computed(() => 20);

const strokeWidth = computed(() => 3);

const pointRadius = computed(() => 4);

const gGraphTransform = computed(() => {
  const tx = gGraphMargin.value;
  const ty = gGraphMargin.value;
  return `translate(${tx},${ty})`;
});

const xScale = computed(() => {
  const maxDomain = n.value - 1;
  const maxRange = svgWidth.value - 2 * gGraphMargin.value;
  return d3.scaleLinear().domain([0, maxDomain]).range([0, maxRange]);
});

const yScale = computed(() => {
  const maxRange = svgHeight.value - 2 * gGraphMargin.value;
  return d3.scaleLinear().domain([100, 0]).range([0, maxRange]);
});

const lineGenerator = computed(() => {
  return d3
    .line<LineChartDatum>()
    .x((d) => xScale.value(d.index))
    .y((d) => yScale.value(d.y));
});

const linePath = computed(() => {
  return lineGenerator.value(data) ?? "";
});

const generateData = () => {
  data.length = 0;
  for (let i = 0; i < n.value; i++) {
    data.push({
      index: i,
      x: i,
      y: 10 + 80 * Math.random(),
    });
  }
};

const updateDimensions = () => {
  if (svgRef.value) {
    svgWidth.value = svgRef.value.clientWidth;
    svgHeight.value = svgWidth.value / aspectRatio;
  } else {
    svgHeight.value = 0;
    svgWidth.value = 0;
  }
};

watch([svgRef], () => {
  updateDimensions();
});

onMounted(() => {
  generateData();
  window.addEventListener("resize", () => {
    updateDimensions();
  });
});
</script>

<template>
  <article>
    <h1>Line Chart</h1>

    <section>
      <p class="lead">
        Let's introduce a <code>&lt;path&gt;</code> element to draw a line. As
        before, we are using
        <a href="http://d3js.org" target="_blank" rel="noopener noreferrer"
          >D3.js</a
        >
        for its computational power, but we are not using its DOM manipulation
        capabilities. The <code>&lt;path&gt;</code> and
        <code>&lt;circle&gt;</code> elements are already present in the
        template.
      </p>
    </section>

    <section>
      <svg
        class="svg"
        :width="svgWidth"
        :height="svgHeight"
        :viewBox="svgViewBox"
        ref="svgRef"
      >
        <g class="graph" :transform="gGraphTransform">
          <path
            class="line"
            :d="linePath"
            :stroke="color"
            stroke-linecap="round"
            stroke-linejoin="round"
            :stroke-width="strokeWidth"
            fill="none"
          ></path>
          <circle
            v-for="datum in data"
            :key="datum.index"
            :cx="xScale(datum.x)"
            :cy="yScale(datum.y)"
            :r="pointRadius"
            stroke="none"
            :fill="color"
          ></circle>
        </g>
        <text
          class="mouse-position"
          :x="svgWidth - 4"
          :y="svgHeight - 4"
          text-anchor="end"
        >
          x: {{ cursorPosition.x.toFixed(0) }}, y:
          {{ cursorPosition.y.toFixed(0) }}
        </text>
      </svg>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.mouse-position {
  font-size: 0.8rem;
  fill: #606060;
}

.svg {
  width: 100%;
  min-width: 18rem;
  background-color: white;
}
</style>
