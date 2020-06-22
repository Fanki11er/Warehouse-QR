import {
  storeType,
  storeItem,
  Order,
  Shortage,
  MultiStepFormSettingsInterface,
} from '../types/types';

export class StoreType implements storeType {
  name: string;
  identifier: string;
  defaultItemName: string;
  constructor(name: string, identifier: string, defaultItemName: string) {
    this.name = name;
    this.identifier = identifier;
    this.defaultItemName = defaultItemName;
  }
}

export class StoreItem implements storeItem {
  orderDescription: string = '';

  constructor(
    public storeType: string = '',
    public name: string,
    public id: number,
    public identifier: string = '',
    public dimension: string,
    public mainType: string = '',
    public secondType: string = '',
    public defaultOrderAmount: number,
    public additionalDescriptions: string,
    public quantity: number = 0,
    public catalogNumber: string = '',
  ) {
    this.name = name.toUpperCase();
    this.mainType = mainType.toUpperCase();
    this.secondType = secondType.toUpperCase();
  }
}

export class Tag {
  id: string;
  description: string;
  dimension: string;
  constructor(id: string, description: string, dimension: string) {
    this.id = id;
    this.description = description;
    this.dimension = dimension;
  }
}

export class ItemOrder implements Order {
  constructor(
    public itemIdentifier: string,
    public orderDescription: string,
    public quantity: number = 0,
    public units: string,
    public extraInfo: string = '',
  ) {}
}

export class ItemShortage implements Shortage {
  constructor(
    public itemIdentifier: string,
    public orderDescription: string,
    public date: string,
  ) {}
}

export class MultiStepFormSettings implements MultiStepFormSettingsInterface {
  constructor(public minIndex: number, public maxIndex: number) {}
}
