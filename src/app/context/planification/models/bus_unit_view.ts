import { Bus } from "./bus";
import { BusUnit } from "./bus_unit";
import { Driver } from "./driver";

export interface BusUnitView {
    busUnit: BusUnit;
    driver: Driver;
    bus: Bus;
  }