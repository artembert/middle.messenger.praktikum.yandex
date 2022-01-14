import "./edit-account-page.css";
import Handlebars from "handlebars";
import { editAccountPageTemplate } from "./edit-account-page.tmpl";
import { InputProps } from "../../components/input";
import { Routes } from "../../constants/routes";

const fields: InputProps[] = [
  {
    name: "email",
    label: "Почта",
    value: "user-eml-96@gmail.com",
  },
  {
    name: "login",
    label: "Логин",
    value: "user-eml-96",
  },
  {
    name: "first_name",
    label: "Имя",
    value: "Дмитрий",
  },
  {
    name: "second_name",
    label: "Фамилия",
    value: "Федоров",
  },
  {
    name: "display_name",
    label: "Имя в чате",
    value: "Дмитрий Ф.",
  },
  {
    name: "phone",
    label: "Телефон",
    value: "+7 (999) 528-07-52",
    mode: "error",
    error: "Введине номер в формате +X (XXX) XXX-XX-XX",
  },
];

const accountPageLink = `/${Routes.ACCOUNT}`;

export function editAcoountPage() {
  const template = Handlebars.compile(editAccountPageTemplate);
  return Promise.resolve(
    template({
      fields,
      accountPageLink,
    })
  );
}
