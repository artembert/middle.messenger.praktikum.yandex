import type { IChildComponent } from './child-component.interface';

export interface IComponentProps {
  attributes?: any,
  child?: IChildComponent | HTMLElement | string;
  events?: Record<string, (...args: any) => void>;

  [key: string]: any;
}
