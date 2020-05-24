import { storeType } from '../types/types';

export class StoreType implements storeType {
  name: string;
  type: string;
  identifier: string;
  constructor(name: string, identifier: string, type: string) {
    this.name = name;
    this.identifier = identifier;
    this.type = type;
  }
}
