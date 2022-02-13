import './avatar.css';
import Handlebars from 'handlebars';
import { avatarTemplate } from './avatar.tmpl';

export function registerAvatarComponent() {
  Handlebars.registerPartial('app-avatar', avatarTemplate);
}
