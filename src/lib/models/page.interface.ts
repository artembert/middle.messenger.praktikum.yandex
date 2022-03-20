import { Block } from '../block/block';
import { IComponentProps } from '../interfaces/component-props.interface';

export interface IPage<TProps extends IComponentProps = {}> {
  new (props: Partial<TProps>, rootId: string): Block;
}
