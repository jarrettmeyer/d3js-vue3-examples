export function deg2Rad(deg: number): number {
  deg = deg % 360;
  return (deg * Math.PI) / 180;
}
