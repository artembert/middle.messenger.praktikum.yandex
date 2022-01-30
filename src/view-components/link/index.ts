import Handlebars from 'handlebars';
import { linkTemplate } from './link.tmpl';

type Mode = 'primary' | 'secondary' | 'dangerous' | 'link' | 'icon';

export interface ButtonProps {
  mode: Mode;
  text: string;
  href: string;
}

export function registerLinkComponent() {
  Handlebars.registerPartial('app-link', linkTemplate);
}
