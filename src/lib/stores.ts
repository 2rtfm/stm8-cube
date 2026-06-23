import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { STM8S103F3P6_TSSOP20 } from "@/data/chips/stm8s103f3p6";
import type { ChipDetail, PinDefs } from "@/types/chip";

const storage = createJSONStorage<PinDefs>(() => window.localStorage);

export const pinDefsAtom = atomWithStorage<PinDefs>(
  "core:pinDefs",
  {},
  storage,
  {
    getOnInit: true,
  },
);

export const chipDetailAtom = atom<ChipDetail>(STM8S103F3P6_TSSOP20);
