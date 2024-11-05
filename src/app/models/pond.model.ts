// File: src/app/models/pond.model.ts

export interface Pond {
  id: string;
  name: string;
  location: string;
  size: string;
  image?: File; // Optional, if you are uploading images
  sensors?: Sensor[];
  uploadImage?: any; // If you need this property, keep it; otherwise, you can remove it.
}

export interface Sensor {
  type: string;
  value: string;
}
