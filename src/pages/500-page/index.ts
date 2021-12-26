import Handlebars from "handlebars";
import { internalErrorPageTemplate } from "./500-page.tmpl";
import { Routes } from "../../constants/routes";

const chatsPageLink = `/${Routes.CHATS}`;

export function internalErrorPage() {
  const template = Handlebars.compile(internalErrorPageTemplate);
  return Promise.resolve(
    template({
      chatsPageLink,
    })
  );
}
