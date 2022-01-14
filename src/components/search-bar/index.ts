import "./search-bar.css";
import Handlebars from "handlebars";
import { searchBarTemplate } from "./search-bar.tmpl";

export interface SearchBarProps {
  name: string;
  placeholder: string;
}

export function registerSearchBarComponent() {
  Handlebars.registerPartial("app-search-bar", searchBarTemplate);
}
