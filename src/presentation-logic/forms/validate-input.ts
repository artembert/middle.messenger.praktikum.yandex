export type InputValidationFn = (inputValue: string) => string;

export interface IValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

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

export const alphabet = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/^[A-Za-zА-ЯЁа-яё0-9_-]*$/g.test(testingValue)) {
    return '';
  }
  return 'Допустима латиница и кириллица';
};

export const password = () => (inputValue: string): string => {
  const testingValue = inputValue || '';
  if (/(?=.*\d)(?=.*[a-z/а-я])(?=.*[A-Z/А-Я]).{8,}/.test(testingValue)) {
    return '';
  }
  return 'Должен содерать по крайней мере одну цифру, одну строчную букву и одну заглавную букву';
};
