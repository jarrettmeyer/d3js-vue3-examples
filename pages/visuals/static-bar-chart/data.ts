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

export function generateData(): StaticBarChartDatum[] {
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
