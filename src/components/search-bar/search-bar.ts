import './search-bar.css';
import Handlebars from 'handlebars';
import { searchBarTemplate } from './search-bar.tmpl';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

export interface ISearchBarProps extends IComponentProps {
  name?: string;
  value?: string;
  placeholder?: string;
}

const template = Handlebars.compile(searchBarTemplate);

export class SearchBar extends Block<ISearchBarProps> {
  constructor(props: ISearchBarProps) {
    super('div', {
      value: props.value,
      name: props.name,
      placeholder: props.placeholder,
      events: props.events ?? {},
      internalEvents: props.internalEvents ?? {},
    });
  }

  override render(): string {
    return template(this.props);
  }

  public getValue(): string {
    return this._getHtmlInputElement().value;
  }

  public focus(): void {
    this._getHtmlInputElement().focus();
    this._getHtmlInputElement().selectionStart = this.getValue().length;
  }

  private _getHtmlInputElement(): HTMLInputElement {
    const el = this.element;
    return el.getElementsByTagName('input')[0];
  }
}
