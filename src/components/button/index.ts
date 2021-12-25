import Handlebars from "handlebars";
import { buttonTemplate } from "./button.tmpl";

type ButtonMode = "primary" | "secondary" | "dangerous" | "link" | "icon";

export interface ButtonProps {
  text: string;
  mode: ButtonMode;
  submit?: boolean;
}

export function registerButtonComponent() {
  Handlebars.registerPartial("app-button", buttonTemplate);
}
