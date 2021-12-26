import "./account-page.css";

import Handlebars from "handlebars";
import { accountPageTemplate } from "./account-page.tmpl";
import { InputProps } from "../../components/input";
import { registerAccountHeaderComponent } from "./account-header";
import { Routes } from "../../constants/routes";

const fields: InputProps[] = [
  {
    name: "email",
    label: "Почта",
    mode: "readonly",
    value: "user-eml-96@gmail.com",
  },
  {
    name: "login",
    label: "Логин",
    mode: "readonly",
    value: "user-eml-96",
  },
  {
    name: "first_name",
    label: "Имя",
    mode: "readonly",
    value: "Дмитрий",
  },
  {
    name: "second_name",
    label: "Фамилия",
    mode: "readonly",
    value: "Федоров",
  },
  {
    name: "phone",
    label: "Телефон",
    mode: "readonly",
    value: "+7 (999) 528-07-52",
  },
];

const chatPageLink = `/${Routes.CHATS}`;

export function acoountPage() {
  registerAccountHeaderComponent();
  const template = Handlebars.compile(accountPageTemplate);
  return Promise.resolve(
    template({
      fields,
      chatPageLink,
    })
  );
}
