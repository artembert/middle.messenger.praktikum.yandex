import "./input.css";
import Handlebars from "handlebars";
import { inputTemplate } from "./input.tmpl";

export interface InputProps {
  name: string;
  label: string;
  error?: string;
  isPassword?: boolean;
}

export function registerInputComponent() {
  Handlebars.registerPartial("app-input", inputTemplate);
}
