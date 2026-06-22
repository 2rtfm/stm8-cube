import { memo, useMemo, useState } from "react";
import "@/index.css";
import { CircleIcon } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BaseLayout from "@/layouts/BaseLayout";
import { cn } from "./lib/utils";

interface PinDetail {
  id: number;
  name: string;
  defs: string[];
  configurable: boolean;
}

interface ChipDetail {
  id: number;
  name: string;
  packaging: string;
  ram: number;
  flash: number;
  eeprom: number;
  pins: PinDetail[];
}

const STM8S103F3P6_UFQFPN20: ChipDetail = {
  id: 1,
  name: "STM8S103F3P6",
  packaging: "UFQFPN20",
  ram: 1024,
  flash: 8192,
  eeprom: 640,
  pins: [
    {
      id: 1,
      name: "NRST",
      defs: [],
      configurable: false,
    },
    {
      id: 2,
      name: "PA1",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "OSCIN"],
      configurable: true,
    },
    {
      id: 3,
      name: "PA2",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "OSCOUT"],
      configurable: true,
    },
    {
      id: 4,
      name: "VSS",
      defs: [],
      configurable: false,
    },
    {
      id: 5,
      name: "VCAP",
      defs: [],
      configurable: false,
    },
    {
      id: 6,
      name: "VDD",
      defs: [],
      configurable: false,
    },
    {
      id: 7,
      name: "PA3",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "TIM2_CH3", "SPI_NSS"],
      configurable: true,
    },
    {
      id: 8,
      name: "PB5",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "I2C_SDA", "TIM1_BKIN"],
      configurable: true,
    },
    {
      id: 9,
      name: "PB4",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "I2C_SCL", "ADC_ETR"],
      configurable: true,
    },
    {
      id: 10,
      name: "PC3",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "TIM1_CH3", "TIM1_CH1N", "TLI"],
      configurable: true,
    },
    {
      id: 11,
      name: "PC4",
      defs: [
        "Reset",
        "GPIO_In",
        "GPIO_Out",
        "CLK_CCO",
        "TIM1_CH4",
        "AIN2",
        "TIM1_CH2N",
      ],
      configurable: true,
    },
    {
      id: 12,
      name: "PC5",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SPI_SCK", "TIM2_CH1"],
      configurable: true,
    },
    {
      id: 13,
      name: "PC6",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SPI_MOSI", "TIM1_CH1"],
      configurable: true,
    },
    {
      id: 14,
      name: "PC7",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SPI_MISO", "TIM1_CH2"],
      configurable: true,
    },
    {
      id: 15,
      name: "PD1",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SWIM"],
      configurable: true,
    },
    {
      id: 16,
      name: "PD2",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN3", "TIM2_CH3"],
      configurable: true,
    },
    {
      id: 17,
      name: "PD3",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN4", "TIM2_CH2", "ADC_ETR"],
      configurable: true,
    },
    {
      id: 18,
      name: "PD4",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "TIM2_CH1", "UART1_CK"],
      configurable: true,
    },
    {
      id: 19,
      name: "PD5",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN5", "UART1_TX"],
      configurable: true,
    },
    {
      id: 20,
      name: "PD6",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN6", "UART1_RX"],
      configurable: true,
    },
  ],
};

const STM8S103F3P6_TSSOP20: ChipDetail = {
  id: 1,
  name: "STM8S103F3P6",
  packaging: "TSSOP20",
  ram: 1024,
  flash: 8192,
  eeprom: 640,
  pins: [
    {
      id: 1,
      name: "PD4",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "TIM2_CH1", "UART1_CK"],
      configurable: true,
    },
    {
      id: 2,
      name: "PD5",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN5", "UART1_TX"],
      configurable: true,
    },
    {
      id: 3,
      name: "PD6",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN6", "UART1_RX"],
      configurable: true,
    },
    {
      id: 4,
      name: "NRST",
      defs: [],
      configurable: false,
    },
    {
      id: 5,
      name: "PA1",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "OSCIN"],
      configurable: true,
    },
    {
      id: 6,
      name: "PA2",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "OSCOUT"],
      configurable: true,
    },
    {
      id: 7,
      name: "VSS",
      defs: [],
      configurable: false,
    },
    {
      id: 8,
      name: "VCAP",
      defs: [],
      configurable: false,
    },
    {
      id: 9,
      name: "VDD",
      defs: [],
      configurable: false,
    },
    {
      id: 10,
      name: "PA3",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "TIM2_CH3", "SPI_NSS"],
      configurable: true,
    },
    {
      id: 11,
      name: "PB5",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "I2C_SDA", "TIM1_BKIN"],
      configurable: true,
    },
    {
      id: 12,
      name: "PB4",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "I2C_SCL", "ADC_ETR"],
      configurable: true,
    },
    {
      id: 13,
      name: "PC3",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "TIM1_CH3", "TIM1_CH1N", "TLI"],
      configurable: true,
    },
    {
      id: 14,
      name: "PC4",
      defs: [
        "Reset",
        "GPIO_In",
        "GPIO_Out",
        "CLK_CCO",
        "TIM1_CH4",
        "AIN2",
        "TIM1_CH2N",
      ],
      configurable: true,
    },
    {
      id: 15,
      name: "PC5",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SPI_SCK", "TIM2_CH1"],
      configurable: true,
    },
    {
      id: 16,
      name: "PC6",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SPI_MOSI", "TIM1_CH1"],
      configurable: true,
    },
    {
      id: 17,
      name: "PC7",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SPI_MISO", "TIM1_CH2"],
      configurable: true,
    },
    {
      id: 18,
      name: "PD1",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "SWIM"],
      configurable: true,
    },
    {
      id: 19,
      name: "PD2",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN3", "TIM2_CH3"],
      configurable: true,
    },
    {
      id: 20,
      name: "PD3",
      defs: ["Reset", "GPIO_In", "GPIO_Out", "AIN4", "TIM2_CH2", "ADC_ETR"],
      configurable: true,
    },
  ],
};

type PinDirection = "left" | "right" | "top" | "bottom";

const pinColors: Record<string, string> = {
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

function pinColor(pinDef: string) {
  const lowerPinDef = pinDef.toLowerCase();
  for (const key in pinColors) {
    if (lowerPinDef.includes(key)) {
      return pinColors[key];
    }
  }
  return "text-slate-400 fill-slate-400";
}

const pinDirectionStyleDefs = {
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

const PinDisplay = memo(function PinDisplay({
  pinDetail,
  direction = "left",
}: {
  pinDetail: PinDetail;
  direction: PinDirection;
}) {
  const [pinDef, setPinDef] = useState("Reset");
  const pinDefColor = useMemo(() => pinColor(pinDef), [pinDef]);
  const writingMode = useMemo(() => {
    switch (direction) {
      case "top":
        return "sideways-lr";
      case "bottom":
        return "vertical-rl";
      default:
        return "horizontal-tb";
    }
  }, [direction]);
  return (
    <div
      className={cn(
        "flex gap-2 justify-center items-center",
        pinDirectionStyleDefs[direction].mainDiv,
      )}
    >
      {pinDef !== "Reset" && (
        <Badge
          className={cn("text-sm bg-card py-1 rounded-md", pinDefColor)}
          style={{ writingMode }}
          variant="outline"
        >
          {pinDef}
        </Badge>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center justify-end",
              pinDirectionStyleDefs[direction].button,
            )}
            style={{ writingMode }}
            disabled={!pinDetail.configurable}
          >
            <div className="text-primary">{pinDetail.name}</div>
            <div className="text-muted-foreground">
              {String(pinDetail.id).padStart(2, "0")}
            </div>
            <div className="">
              <CircleIcon className={cn("size-3 opacity-60", pinDefColor)} />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={direction} align="start" className="">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{pinDetail.name}</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={pinDef} onValueChange={setPinDef}>
              {pinDetail.defs.map((def) => (
                <DropdownMenuRadioItem
                  key={def}
                  value={def}
                  className={`${pinColor(def)}`}
                >
                  {def}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

const Pins = memo(function Pins({
  pinDetails,
  direction = "left",
  className,
}: {
  pinDetails: PinDetail[];
  direction: PinDirection;
  className?: string;
}) {
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
});

const ChipDisplay = memo(function ChipDisplay({ chip }: { chip: ChipDetail }) {
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
    </TransformWrapper>
  );
});

export function App() {
  return (
    <BaseLayout>
      <div className="h-full w-full p-2">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full w-full rounded-lg"
        >
          <ResizablePanel defaultSize="20%">
            <div className="flex h-full items-center justify-center p-2 border rounded-lg">
              <span className="font-semibold">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="20%">
            <div className="flex h-full items-center justify-center p-2 border rounded-lg">
              <span className="font-semibold">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="60%">
            <ChipDisplay chip={STM8S103F3P6_TSSOP20} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </BaseLayout>
  );
}

export default App;
