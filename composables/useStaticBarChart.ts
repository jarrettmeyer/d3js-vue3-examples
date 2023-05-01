import * as d3 from "d3";

export interface StaticBarChartDatum {
  index: number;
  label: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

export function useStaticBarChart(target: Ref<HTMLElement | null>) {
  function generateData(): StaticBarChartDatum[] {
    const data: StaticBarChartDatum[] = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        index: i,
        label: String.fromCharCode(65 + i),
        value: Math.floor(1 + i * 5 + 49 * Math.random()),
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        fill: d3.schemeCategory10[i],
      });
    }
    return data;
  }

  const data = reactive(generateData());

  const { height, width } = useResizeObserver(target);

  const paddingInner = ref(0.1);

  const paddingOuter = ref(0.1);

  const count = ref(10);

  const margin = ref(20);

  const innerWidth = computed(() =>
    Math.max(width.value - margin.value * 2, 0)
  );

  const innerHeight = computed(() =>
    Math.max(height.value - margin.value * 2, 0)
  );

  const filteredData = computed(() =>
    data.filter((d) => d.index < count.value)
  );

  const xDomain = computed(() => filteredData.value.map((d) => d.label));

  const xRange = computed(() => [0, innerWidth.value]);

  const xScale = computed(() => {
    return d3
      .scaleBand()
      .domain(xDomain.value)
      .range(xRange.value)
      .paddingInner(paddingInner.value)
      .paddingOuter(paddingOuter.value);
  });

  const yDomain = ref([100, 0]);

  const yRange = computed(() => [0, innerHeight.value]);

  const yScale = computed(() => {
    return d3.scaleLinear().domain(yDomain.value).range(yRange.value);
  });

  const computedData = computed(() => {
    return filteredData.value.map((d) => ({
      ...d,
      x: xScale.value(d.label) || 0,
      y: yScale.value(d.value),
      width: xScale.value.bandwidth(),
      height: yScale.value(0) - yScale.value(d.value),
    }));
  });

  return {
    computedData,
    count,
    height,
    margin,
    paddingInner,
    paddingOuter,
    width,
  };
}
