import { Block } from '../Block/Block';
import { IComponentProps } from '../interfaces/component-props.interface';

export interface IPage {
  new (params: IPageConstructorParams): Block;
}

export interface IPageConstructorParams<TProps extends IComponentProps = {}> {
  rootId: string;
  props: Partial<TProps>;
}
