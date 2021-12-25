import Handlebars from "handlebars";
import { signInPageTemplate } from "./sign-in-page.tmpl";
import { InputProps } from "../../components/input";

const fields: InputProps[] = [
  {
    name: "login",
    label: "Логин",
  },
  {
    name: "password",
    label: "Пароль",
    isPassword: true,
    error: "Неправильный пароль",
  },
];

export function signInPage() {
  const template = Handlebars.compile(signInPageTemplate);
  return Promise.resolve(
    template({
      fields,
    })
  );
}
