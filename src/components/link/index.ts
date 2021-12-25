import Handlebars from "handlebars";
import { linkTemplate } from "./link.tmpl";

type mode = "primary" | "secondary" | "dangerous" | "link";

export interface ButtonProps {
  mode: mode;
  text: string;
  href: string;
}

export function registerLinkComponent() {
  Handlebars.registerPartial("app-link", linkTemplate);
}
