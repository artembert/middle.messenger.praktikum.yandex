import './account-header.css';
import Handlebars from 'handlebars';
import { accountHeaderTemplate } from './account-header.tmpl';

export function registerAccountHeaderComponent() {
  Handlebars.registerPartial('app-account-header', accountHeaderTemplate);
}
