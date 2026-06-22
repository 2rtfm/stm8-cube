export interface PinDetail {
  id: number;
  name: string;
  defs: string[];
  configurable: boolean;
}

export interface ChipDetail {
  id: number;
  name: string;
  packaging: string;
  ram: number;
  flash: number;
  eeprom: number;
  pins: PinDetail[];
}
