import { ChildrenComponents } from './children-components.type';

export interface IComponentProps {
  [key: string]: any;

  attributes?: any;
  children?: ChildrenComponents;
  events?: Record<string, (...args: any) => void>;
  classNames?: string[];
}
