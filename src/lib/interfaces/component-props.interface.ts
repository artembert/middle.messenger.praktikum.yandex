import { ChildrenComponents } from './children-components.type';

type EventListenersForEvent = Record<string, (...args: any) => void>;

export interface IComponentProps {
  [key: string]: any;

  attributes?: Record<string, any>;
  children?: ChildrenComponents;
  events?: EventListenersForEvent;
  internalEvents?: Record<string, EventListenersForEvent>;
  classNames?: string[];
}
