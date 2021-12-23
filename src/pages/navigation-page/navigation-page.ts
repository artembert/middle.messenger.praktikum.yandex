import Handlebars from "handlebars";
import { navigationPageTemplate } from "./navigation-page.tmpl";

export function navigationPage() {
  const template = Handlebars.compile(navigationPageTemplate);
  return Promise.resolve(template({}));
}
