export type ColorOption = {
  id: string;
  name: string;
  color: string;
  gradient?: string;
};

export type VehiclePart = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type VehicleFeature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  value?: string | number;
};

export type VehicleModel = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  colors: ColorOption[];
  features: VehicleFeature[];
  parts: VehiclePart[];
  specs: {
    [key: string]: string | number;
  };
};