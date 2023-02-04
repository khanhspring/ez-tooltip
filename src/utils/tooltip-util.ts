import { Placement } from "../models/tooltip";

export const calculatePosition = (
  placement: Placement,
  spacing: number,
  component?: HTMLElement,
  tooltip?: HTMLElement
) => {
  if (!component || !tooltip) {
    return;
  }

  const scrollTop = document.documentElement.scrollTop;
  const { x, y, height, width } = component.getBoundingClientRect();

  if (placement === "right") {
    Object.assign(tooltip.style, {
      left: `${x + width + spacing}px`,
      top: `${y + scrollTop}px`,
      marginTop: `${height / 2}px`,
      transform: `translateY(-50%)`,
    });
    return;
  }

  if (placement === "left") {
    Object.assign(tooltip.style, {
      left: `${x - spacing}px`,
      top: `${y + scrollTop}px`,
      marginTop: `${height / 2}px`,
      transform: `translateY(-50%) translateX(-100%)`,
    });
    return;
  }

  if (placement === "top") {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y + scrollTop - spacing}px`,
      marginLeft: `${width / 2}px`,
      transform: `translateY(-100%) translateX(-50%)`,
    });
    return;
  }

  // default: bottom
  Object.assign(tooltip.style, {
    left: `${x}px`,
    top: `${y + scrollTop + height + spacing}px`,
    marginLeft: `${width / 2}px`,
    transform: `translateX(-50%)`,
  });
};
