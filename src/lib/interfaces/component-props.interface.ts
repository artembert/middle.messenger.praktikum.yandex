import type { IChildComponent } from './child-component.interface';

export interface IComponentProps {
  [key: string]: any;

  attributes?: any;
  child?: IChildComponent | HTMLElement | string;
  events?: Record<string, (...args: any) => void>;
  className?: string;
}
