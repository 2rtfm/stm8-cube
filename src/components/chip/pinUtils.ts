import { useMemo } from "react";

export type PinDirection = "left" | "right" | "top" | "bottom";

export const pinColors: Record<string, string> = {
  reset: "text-gray-400 fill-gray-400",
  gpio: "text-green-400 fill-green-400",
  uart: "text-sky-400 fill-sky-400",
  ain: "text-teal-400 fill-teal-400",
  adc: "text-teal-400 fill-teal-400",
  tim: "text-red-400 fill-red-400",
  spi: "text-orange-400 fill-orange-400",
  i2c: "text-purple-400 fill-purple-400",
  osc: "text-amber-400 fill-amber-400",
  clk: "text-amber-400 fill-amber-400",
};

export function pinColor(pinDef: string) {
  const lowerPinDef = pinDef.toLowerCase();
  for (const key in pinColors) {
    if (lowerPinDef.includes(key)) {
      return pinColors[key];
    }
  }
  return "text-slate-400 fill-slate-400";
}

export const pinDirectionStyleDefs = {
  left: {
    mainDiv: "flex-row",
    button: "w-26 h-8",
    pinAlign: "flex-col items-end",
  },
  right: {
    mainDiv: "flex-row-reverse",
    button: "w-26 h-8 flex-row-reverse",
    pinAlign: "flex-col-reverse items-start",
  },
  top: {
    mainDiv: "flex-col w-8",
    button: "h-26 w-8 flex-row-reverse",
    pinAlign: "flex-row-reverse items-end",
  },
  bottom: {
    mainDiv: "flex-col-reverse w-8",
    button: "h-26 w-8 flex-row-reverse",
    pinAlign: "flex-row items-start",
  },
};

export function usePinWritingMode(direction: PinDirection) {
  return useMemo(() => {
    switch (direction) {
      case "top":
        return "sideways-lr";
      case "bottom":
        return "vertical-rl";
      default:
        return "horizontal-tb";
    }
  }, [direction]);
}
