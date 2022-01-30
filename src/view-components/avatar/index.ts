import './avatar.css';
import Handlebars from 'handlebars';
import { avatarTemplate } from './avatar.tmpl';

export interface AvatarProps {
  size: 'L' | 'M' | 'S';
}

export function registerAvatarComponent() {
  Handlebars.registerPartial('app-avatar', avatarTemplate);
}
