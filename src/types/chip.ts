// default: floating:true wpu:true exti:true
interface InputDetail {
  floating?: boolean;
  wpu?: boolean;
  exti?: boolean;
}

// default: hs:true speed:"O3" od:true pp:true tod:false
interface OutputDetail {
  hs?: boolean;
  speed?: "O1" | "O2" | "O3" | "O4";
  od?: boolean;
  pp?: boolean;
  tod?: boolean;
}

type AFR = `AFR${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

export interface PinDetail {
  id: number;
  name: string;
  defs: string[];
  sideEffect?: Record<string, [AFR, boolean][]>;
  configurable: boolean;
  input?: InputDetail;
  output?: OutputDetail;
}

export type AfrEffect = Partial<
  Record<AFR, Record<"true" | "false", [string, string[]][]>>
>;

export type AfrConstrain = AFR[][];

export interface ChipDetail {
  id: number;
  name: string;
  packaging: string;
  ram: number;
  flash: number;
  eeprom: number;
  pins: PinDetail[];
  afrConstrain: AfrConstrain;
  afrEffect: AfrEffect;
}

export type PinDefs = Record<string, string>;
