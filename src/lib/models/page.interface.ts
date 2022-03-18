import { Block } from '../block/block';
import { IComponentProps } from '../interfaces/component-props.interface';

export interface IPage {
  new (params: IPageConstructorParams): Block;
}

export interface IPageConstructorParams<TProps extends IComponentProps = {}> {
  rootId: string;
  props: Partial<TProps>;
}
