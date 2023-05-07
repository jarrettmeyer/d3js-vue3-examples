export type ResourceObserverTarget = Ref<HTMLElement | SVGElement | null>;

export interface UseResizeObserverOptions {
  cssOverflow?: "auto" | "hidden" | "scroll" | "visible";
  cssResize?: "both" | "horizontal" | "none" | "vertical";
  initialHeight?: number;
  initialWidth?: number;
}

export function useResizeObserver(
  target: ResourceObserverTarget,
  options: UseResizeObserverOptions = {}
) {
  const height = ref(options.initialHeight ?? 0);
  const width = ref(options.initialWidth ?? 0);

  watch([target], () => {
    if (target.value) {
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry.target instanceof HTMLElement) {
          height.value = entry.target.clientHeight;
          width.value = entry.target.clientWidth;
        }
      });

      target.value.style.resize = options.cssResize ?? "both";
      target.value.style.overflow = options.cssOverflow ?? "auto";
      resizeObserver.observe(target.value);
    }
  });

  return { height, width };
}
