import "./input.css";
import Handlebars from "handlebars";
import { inputTemplate } from "./input.tmpl";

export interface InputProps {
  name: string;
  label: string;
  error?: string;
}

export function registerInputComponent() {
  Handlebars.registerPartial("input", inputTemplate);
}
