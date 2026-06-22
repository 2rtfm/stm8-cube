import { memo } from "react";
import { cn } from "@/lib/utils";
import type { PinDetail } from "@/types/chip";
import { PinDisplay } from "./PinDisplay";
import { type PinDirection, pinDirectionStyleDefs } from "./pinUtils";

const PinsRaw = ({
  pinDetails,
  direction = "left",
  className,
}: {
  pinDetails: PinDetail[];
  direction: PinDirection;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-center gap-2",
        pinDirectionStyleDefs[direction].pinAlign,
        className,
      )}
    >
      {pinDetails.map((detail) => (
        <PinDisplay key={detail.id} pinDetail={detail} direction={direction} />
      ))}
    </div>
  );
};

export const Pins = memo(PinsRaw);
