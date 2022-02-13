import { Block } from '../Block/Block';

export interface IPage {
  new (rootId: string): Block;
}
