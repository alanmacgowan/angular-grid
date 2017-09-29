import { IEntity } from '../src/IEntity';

export class Book implements IEntity {
  constructor(public _id: string) {}
}
