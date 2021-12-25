import Handlebars from "handlebars";
import { buttonTemplate } from "./button.tmpl";

type ButtonMode = "primary" | "secondary" | "dangerous" | "link";

export interface ButtonProps {
  text: string;
  mode: ButtonMode;
  submit?: boolean;
}

export function registerButtonComponent() {
  Handlebars.registerPartial("app-button", buttonTemplate);
}
