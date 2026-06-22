import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => window.localStorage);

export const pinDefsAtom = atomWithStorage("core:pinDefs", {}, storage, {
  getOnInit: true,
});
