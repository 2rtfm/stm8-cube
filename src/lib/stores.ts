import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { STM8S103F3P6_TSSOP20 } from "@/data/chips/stm8s103f3p6";
import type { AfrStatus, ChipDetail, PinDefs } from "@/types/chip";

const pinDefsStorage = createJSONStorage<PinDefs>(() => window.localStorage);

const afrStatusStorage = createJSONStorage<AfrStatus>(
  () => window.localStorage,
);

export const pinDefsAtom = atomWithStorage<PinDefs>(
  "core:pinDefs",
  {},
  pinDefsStorage,
  {
    getOnInit: true,
  },
);

export const chipDetailAtom = atom<ChipDetail>(STM8S103F3P6_TSSOP20);

export const afrStatusAtom = atomWithStorage<AfrStatus>(
  "core:afrStatus",
  { AFR0: false, AFR1: false, AFR3: false, AFR4: false, AFR7: false },
  afrStatusStorage,
  {
    getOnInit: true,
  },
);
