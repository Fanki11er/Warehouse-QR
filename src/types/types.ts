import { MultiStepFormSettings } from '../classes/classes';

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
  quantity: number;
  catalogNumber: string;
};

export type Order = {
  itemIdentifier: string;
  orderDescription: string;
  quantity: number;
  units: string;
  extraInfo: string;
};

export interface AddFormSettings {
  withTag: boolean;
  withOrder: boolean;
}

export interface StatusInfo {
  status: '' | 'error' | 'ok';
  message: string;
}

export interface Shortage {
  itemIdentifier: string;
  orderDescription: string;
  date: string;
  catalogNumber: string;
}

export interface DeleTeModalInterface {
  isDeleteModalOpened: boolean;
  itemToDelete: storeItem | null;
  toggleDeleteModal: (item: storeItem | null) => void;
  deleteStoreItem: Function;
}

export interface MultiStepFormInterface {
  currentIndex: number;
  changeCurrentIndex: (
    currentIndex: number,
    settings: MultiStepFormSettings,
    action: 'prev' | 'next',
  ) => void;
  createSettings: (minIndex: number, maxIndex: number) => MultiStepFormSettings;
  resetCurrentIndex: (minIndex: number) => void;
}

export interface MultiStepFormSettingsInterface {
  minIndex: number;
  maxIndex: number;
}
