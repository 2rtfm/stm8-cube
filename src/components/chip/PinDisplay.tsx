import { CircleIcon } from "lucide-react";
import { memo, useState } from "react";
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
import { cn } from "@/lib/utils";
import type { PinDetail } from "@/types/chip";
import {
  type PinDirection,
  pinColor,
  pinDirectionStyleDefs,
  usePinWritingMode,
} from "./pinUtils";

export const PinDisplay = memo(function PinDisplay({
  pinDetail,
  direction = "left",
}: {
  pinDetail: PinDetail;
  direction: PinDirection;
}) {
  const [pinDef, setPinDef] = useState("Reset");
  const pinDefColor = pinColor(pinDef);
  const writingMode = usePinWritingMode(direction);

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
