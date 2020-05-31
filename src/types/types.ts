enum storeTypes {
  screws = 'sruby',
}

export type button = {
  text: string;
  action: Function;
  isActive: boolean;
};

export interface storeType {
  name: string;
  identifier: string;
  defaultItemName: string;
}

export type baseReference = firebase.database.Reference;

export type storeItem = {
  storeType: string; //? SRU
  id: number; //? 2 converted to 0002
  identifier: string; //? SRU-000
  name: string; //? Śruba
  dimension: string; //? M16x24
  defaultOrderAmount: number; //? 100
  mainType: string; //? Imbus
  secondType: string; //?Stożek
  additionalDescriptions: string; //? Uwagi
  orderDescription: string;
};
