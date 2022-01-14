import "./change-password-page.css";
import Handlebars from "handlebars";
import { changePasswordPageTemplate } from "./change-password-page.tmpl";
import { InputProps } from "../../components/input";
import { Routes } from "../../constants/routes";

const fields: InputProps[] = [
  {
    name: "oldPassword",
    label: "Старый пароль",
    isPassword: true,
  },
  {
    name: "newPassword",
    label: "Новый пароль",
    isPassword: true,
  },
  {
    name: "password-repeat",
    label: "Повтор пароля",
    isPassword: true,
    error: "Пароли должны совпадать",
    mode: "error",
  },
];

const accountPageLink = `/${Routes.ACCOUNT}`;

export function changePasswordPage() {
  const template = Handlebars.compile(changePasswordPageTemplate);
  return Promise.resolve(
    template({
      fields,
      accountPageLink,
    })
  );
}
