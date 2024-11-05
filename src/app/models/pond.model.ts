// File: src/app/models/pond.model.ts

export interface Pond {
  id: string;
  name: string;
  location: string;
  size: string;
  sensors?: Sensor[];
}

export interface Sensor {
  type: string;
  value: string;
}