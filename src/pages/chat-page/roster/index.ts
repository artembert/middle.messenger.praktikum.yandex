import "./roster.css";
import Handlebars from "handlebars";
import { rosterTemplate } from "./roster.tmpl";
import { registerRosterItemComponent } from "./roster-item";

export interface RosterProps {
  chats: undefined[];
}

export function registerRosterComponent() {
  registerRosterItemComponent();
  Handlebars.registerPartial("app-roster", rosterTemplate);
}
