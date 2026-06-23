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

interface PendingWritePinDef {
  name: string;
  newDef: string;
  affectedPins: string[];
  effectArray: [string, boolean][];
}

export const pendingWritePinDefAtom = atom<PendingWritePinDef | null>(null);

export const executeWritePinDefAtom = atom(null, (get, set) => {
  const pending = get(pendingWritePinDefAtom);
  if (!pending) return;
  const { name, newDef, affectedPins, effectArray } = pending;
  set(pinDefsAtom, {
    ...get(pinDefsAtom),
    ...Object.fromEntries(affectedPins.map((item) => [item, "Reset"])),
    [name]: newDef,
  });
  set(afrStatusAtom, {
    ...get(afrStatusAtom),
    ...Object.fromEntries(effectArray),
  });
  set(pendingWritePinDefAtom, null);
});

export const cancelWritePinDefAtom = atom(null, (_, set) => {
  set(pendingWritePinDefAtom, null);
});

export const writePinDefAtom = atom(
  null,
  (get, set, { name, newDef }: { name: string; newDef: string }) => {
    const chip = get(chipDetailAtom);

    const effectArray = chip.pins.find((p) => p.name === name)?.sideEffect?.[
      newDef
    ];
    if (!effectArray) {
      set(pinDefsAtom, { ...get(pinDefsAtom), [name]: newDef });
      return;
    }
    const affectedPins: string[] = [];
    for (const [afr, value] of effectArray) {
      if (get(afrStatusAtom)[afr] === value) {
        continue;
      }
      const afrEffect = chip.afrEffect[afr]?.[!value ? "true" : "false"];
      if (!afrEffect) {
        continue;
      }
      for (const [pinName, defs] of afrEffect) {
        const pinCheck = get(pinDefsAtom)[pinName];
        for (const def of defs) {
          if (pinCheck === def && pinName !== name) {
            affectedPins.push(pinName);
          }
        }
      }
    }
    if (affectedPins.length > 0) {
      set(pendingWritePinDefAtom, { name, newDef, affectedPins, effectArray });
      return;
    }
    set(afrStatusAtom, {
      ...get(afrStatusAtom),
      ...Object.fromEntries(effectArray),
    });
    set(pinDefsAtom, { ...get(pinDefsAtom), [name]: newDef });
  },
);

export const createPinDefAtom = (name: string) =>
  atom(
    (get) => get(pinDefsAtom)[name] ?? "Reset",
    (_, set, newDef: string) => set(writePinDefAtom, { name, newDef }),
  );
