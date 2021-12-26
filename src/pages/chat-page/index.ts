import "./chat-page.css";
import Handlebars from "handlebars";
import { chatPageTemplate } from "./chat-page.tmpl";
import { registerRosterComponent } from "./roster";
import { Routes } from "../../constants/routes";

const chats: undefined[] = new Array(20).fill(undefined);
const accountPageLink = `/${Routes.ACCOUNT}`;

export function chatPage() {
  registerRosterComponent();
  const template = Handlebars.compile(chatPageTemplate);
  return Promise.resolve(template({ chats, accountPageLink }));
}
