import { atom, useAtom } from "jotai";
import { Expand, ZoomIn, ZoomOut } from "lucide-react";
import { memo } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useTransformEffect,
} from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import type { ChipDetail } from "@/types/chip";
import { Pins } from "./Pins";

const scaleAtom = atom(1);

const ScaleDisplayRaw = () => {
  const [scale, setScale] = useAtom(scaleAtom);
  useTransformEffect(({ state }) => {
    setScale(state.scale);
  });
  return <>{Math.round(scale * 100)}%</>;
};

const ScaleDisplay = memo(ScaleDisplayRaw);

const ChipDisplayRaw = ({ chip }: { chip: ChipDetail }) => {
  const isDual =
    chip.packaging.includes("SOP") || chip.packaging.includes("DIP");
  const pinCount = chip.pins.length;
  const leftPinDetails = isDual
    ? chip.pins.slice(0, pinCount / 2)
    : chip.pins.slice(0, pinCount / 4);
  const rightPinDetails = isDual
    ? chip.pins.slice(pinCount / 2)
    : chip.pins.slice(pinCount / 2, (pinCount / 4) * 3);
  const bottomPinDetails = isDual
    ? []
    : chip.pins.slice(pinCount / 4, pinCount / 2);
  const topPinDetails = isDual ? [] : chip.pins.slice((pinCount / 4) * 3);

  return (
    <TransformWrapper
      minScale={0.5}
      wheel={{ step: 0.005 }}
      limitToBounds={false}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className="relative w-full h-full">
          <div className="absolute left-1/2 bottom-0 -translate-1/2 z-10 bg-background">
            <ButtonGroup>
              <Button variant="outline" onClick={() => resetTransform(100)}>
                <Expand />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  zoomIn(0.405);
                }}
              >
                <ZoomIn />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  zoomOut(0.405);
                }}
              >
                <ZoomOut />
              </Button>
              <Button variant="outline">
                <ScaleDisplay />
              </Button>
            </ButtonGroup>
          </div>
          <TransformComponent
            wrapperClass="w-full! h-full! border rounded-lg"
            contentClass="w-full! h-full!"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 place-items-center w-full h-full">
              {!isDual && (
                <Pins
                  className="row-start-1 row-end-1 col-start-2 col-end-2 justify-self-end self-end"
                  pinDetails={topPinDetails}
                  direction="top"
                />
              )}
              <Pins
                className="row-start-2 row-end-2 col-start-1 col-end-1 justify-self-end self-center"
                pinDetails={leftPinDetails}
                direction="left"
              />
              <div
                className={cn(
                  "row-start-2 row-end-2 col-start-2 col-end-2 w-full h-full border flex items-center justify-center flex-col rounded bg-linear-135 from-background to-accent dark:from-accent dark:to-background",
                  isDual ? "aspect-1/2" : "aspect-square",
                )}
              >
                <div className="text-xl text-muted-foreground">{chip.name}</div>
                <div className="text-ring">{chip.packaging}</div>
              </div>
              <Pins
                className="row-start-2 row-end-2 col-start-3 col-end-3 justify-self-start self-center"
                pinDetails={rightPinDetails}
                direction="right"
              />
              {!isDual && (
                <Pins
                  className="row-start-3 row-end-3 col-start-2 col-end-2 justify-self-end self-start"
                  pinDetails={bottomPinDetails}
                  direction="bottom"
                />
              )}
            </div>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

export const ChipDisplay = memo(ChipDisplayRaw);
