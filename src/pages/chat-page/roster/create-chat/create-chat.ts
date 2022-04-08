import './create-chat.css';
import Handlebars from 'handlebars';
import { IComponentProps } from '../../../../lib/interfaces/component-props.interface';
import { createChatTemplate } from './create-chat.tmpl';
import { Block } from '../../../../lib/block/block';
import { Button, Input } from '../../../../components';
import {
  notEmpty,
  validationMessage,
} from '../../../../presentation-logic/forms/validate-input';
import { createChat } from '../../../../business-logic/chats';

interface IChildren {
  appOpenButton?: Button;
  appNewChatInput?: Input;
  appSubmit?: Button;
}

interface IRosterItemProps extends IComponentProps {
  children?: IChildren;
}

const template = Handlebars.compile(createChatTemplate);

export class CreateChat extends Block<IRosterItemProps> {
  private _newChatName: string = '';

  private _appOpenButton: Button = new Button({
    text: '+ Новый чат',
    mode: 'primary',
    classNames: ['create-chat__open'],
    events: {
      click: () => this._showForm(),
    },
  });

  private _appNewChatInput: Input = new Input({
    narrow: true,
    name: 'title',
    classNames: ['create-chat__input'],
    validationFns: [notEmpty()],
    value: this._newChatName,
    internalEvents: {
      input: {
        blur: () => this._handleLoginChange(),
      },
    },
  });

  private _appSubmit: Button = new Button({
    text: 'Создать',
    mode: 'primary',
    classNames: ['create-chat__submit'],
    submit: true,
  });

  constructor(props: IRosterItemProps) {
    super('form', {
      ...props,
      classNames: ['create-chat', ...(props.classNames ?? [])],
      events: {
        submit: (e: SubmitEvent) => this._handleFormSubmit(e),
      },
    });
    this.setProps({
      chat: props.chat,
      children: {
        appOpenButton: this._appOpenButton,
      },
    });
  }

  override render(): string {
    return template({});
  }

  private _showForm(): void {
    this.setProps({
      children: {
        appNewChatInput: this._appNewChatInput,
        appSubmit: this._appSubmit,
      },
    });
  }

  private _hideForm(): void {
    this.setProps({
      children: {
        appOpenButton: this._appOpenButton,
      },
    });
  }

  private _handleLoginChange(): boolean {
    this._newChatName = this._appNewChatInput.getValue();
    const { isValid, errorMessage } = this._appNewChatInput.validate();
    this._appNewChatInput.setProps({
      value: this._newChatName,
      error: errorMessage ?? undefined,
    });
    this._appNewChatInput.setValidState(isValid);
    return isValid;
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    if (!this._handleLoginChange()) {
      return;
    }

    createChat(this._newChatName).then((res) => {
      if (res.isSuccess) {
        this._hideForm();
      } else {
        let message = validationMessage.unidentifiedError;
        if (typeof res.payload === 'string') {
          message = res.payload;
        }
        if (res.payload instanceof Error) {
          message = res.payload.message;
        }
        this._appNewChatInput.setProps({ error: [message] });
      }
    });
  }
}
