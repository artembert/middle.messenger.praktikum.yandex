import './input.css';
import Handlebars from 'handlebars';
import { inputTemplate } from './input.tmpl';

export interface InputProps {
  name: string;
  label: string;
  error?: string;
  isPassword?: boolean;
  mode?: 'default' | 'readonly' | 'error';
  value?: string;
}

export function registerInputComponent() {
  Handlebars.registerPartial('app-input', inputTemplate);
}
