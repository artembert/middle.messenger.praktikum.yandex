import './loader.css';
import Handlebars from 'handlebars';
import { loaderTemplate } from './loader.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

export interface ILoaderProps extends IComponentProps {
  image?: string;
}

const template = Handlebars.compile(loaderTemplate);

export class Loader extends Block<ILoaderProps> {
  constructor(props: ILoaderProps) {
    super('div', {
      ...props,
      classNames: ['loader', ...(props.classNames ?? [])],
    });
  }

  override render(): string {
    return template({});
  }
}
