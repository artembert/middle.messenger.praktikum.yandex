export type InputValidationFn = (inputValue: string) => string;

export interface IValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validationMessage = {
  passwordRepeated: 'Пароли должны совпадать',
};

export const notEmpty = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (testingValue.length === 0) {
    return 'Не может быть пустым';
  }
  return '';
};

export const minLength = (restriction: number) => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (testingValue.length < restriction) {
    return `Минимальная длина: ${restriction} символа(ов)`;
  }
  return '';
};

export const maxLength = (restriction: number) => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (testingValue.length > restriction) {
    return `Максимальная длина: ${restriction} символа(ов)`;
  }
  return '';
};

export const notOnlyNumbers = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/^[0-9]*$/g.test(testingValue)) {
    return 'Не должен состоять только из цифр';
  }
  return '';
};

export const phone = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/^\+?[0-9]*$/.test(testingValue)) {
    return '';
  }
  return 'Допустимы цифры и плюс в начале';
};

export const alphabet = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/^[A-Za-zА-ЯЁа-яё0-9_-]*$/g.test(testingValue)) {
    return '';
  }
  return 'Допустима латиница и кириллица';
};

export const name = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/(^[A-Z][A-Za-z-]*$)|(^[А-ЯЁ][А-Яа-яёЁ-]*$)/.test(testingValue)) {
    return '';
  }
  return 'С заглавной буквы, допустимы латиница или кириллица, дефис';
};

export const login = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/^[A-Za-z0-9_-]*$/g.test(testingValue)) {
    return '';
  }
  return 'Допустимые символы: латиница, цифры, дефис и подчеркивание';
};

export const email = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/^[a-zA-z0-9-]+@[a-zA-z0-9-]+\.[a-zA-z0-9]+$/g.test(testingValue)) {
    return '';
  }
  return 'Проверьте формат';
};

export const password = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/(?=.*\d)(?=.*[a-z/а-я])(?=.*[A-Z/А-Я]).{8,}/.test(testingValue)) {
    return '';
  }
  return 'Должен содерать по крайней мере одну цифру, одну строчную букву и одну заглавную букву';
};
