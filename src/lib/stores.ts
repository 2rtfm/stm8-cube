import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { PinDefs } from "@/types/chip";

const storage = createJSONStorage<PinDefs>(() => window.localStorage);

export const pinDefsAtom = atomWithStorage<PinDefs>(
  "core:pinDefs",
  {},
  storage,
  {
    getOnInit: true,
  },
);
