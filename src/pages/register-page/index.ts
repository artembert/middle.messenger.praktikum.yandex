import Handlebars from "handlebars";
import { registerPageTemplate } from "./register-page.tmpl";
import { InputProps } from "../../components/input";
import { Routes } from "../../constants/routes";

const fields: InputProps[] = [
  {
    name: "email",
    label: "Почта",
  },
  {
    name: "login",
    label: "Логин",
  },
  {
    name: "first_name",
    label: "Имя",
  },
  {
    name: "second_name",
    label: "Фамилия",
  },
  {
    name: "phone",
    label: "Телефон",
  },
  {
    name: "password",
    label: "Пароль",
    isPassword: true,
  },
  {
    name: "password-repeat",
    label: "Повтор пароля",
    isPassword: true,
    error: "Пароли должны совпадать",
  },
];
const signInLink = `/${Routes.SIGN_IN}`;

export function registerPage() {
  const template = Handlebars.compile(registerPageTemplate);
  return Promise.resolve(
    template({
      fields,
      signInLink,
    })
  );
}
