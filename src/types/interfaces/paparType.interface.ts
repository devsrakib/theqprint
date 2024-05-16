export interface IPaperType {
  _id: string;
  printingSetupType: string;
  price: number;
  paperType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IpaperSize {
  _id: string;
  printingSetupType: string;
  height: number;
  width: number;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface IColorMode {
  _id: string;
  printingSetupType: string;
  price: string;
  printingColorMode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
