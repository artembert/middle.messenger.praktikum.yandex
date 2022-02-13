import './roster-item.css';
import Handlebars from 'handlebars';
import { rosterItemTemplate } from './roster-item.tmpl';

export function registerRosterItemComponent() {
  Handlebars.registerPartial('app-roster-item', rosterItemTemplate);
}
