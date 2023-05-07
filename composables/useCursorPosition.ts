export type CursorPositionTarget = Ref<HTMLElement | SVGElement | null>;

export function useCursorPosition(target: CursorPositionTarget) {
  let isTracking = false;
  const x = ref(0);
  const y = ref(0);

  /**
   * Update the cursor X and Y position.
   * @param event Incoming mouse event
   */
  const updatePosition = (event: MouseEvent) => {
    x.value = event.offsetX;
    y.value = event.offsetY;
  };

  watch([target], () => {
    if (target.value && !isTracking) {
      target.value.addEventListener("mousemove", (event: Event) => {
        if (event instanceof MouseEvent) {
          updatePosition(event);
        }
      });
      isTracking = true;
    }
  });

  return { x, y };
}
