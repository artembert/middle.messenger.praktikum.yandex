import './modal.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { modalTemplate } from './modal.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { Button } from '../button/button';

interface IChildren {
  appConfirm?: Button;
  appCancel?: Button;
  appContent?: Block;
}

export interface IModalProps extends IComponentProps {
  children?: IChildren;
  title?: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const template = Handlebars.compile(modalTemplate);

export class Modal extends Block<IModalProps> {
  private _dialogId = `i${v4()}`;

  private _childrenComponents: IChildren = {
    appCancel: new Button({
      mode: 'secondary',
      text: 'Отменить',
      events: {
        click: () => this._cancel(),
      },
    }),
    appConfirm: new Button({
      mode: 'primary',
      text: 'Сохранить',
      events: {
        click: () => this._confirm(),
      },
    }),
  };

  constructor(props: IModalProps) {
    super('div', {
      ...props,
      classNames: ['modal', ...(props.classNames ?? [])],
    });
    this.setProps({
      children: {
        ...this._childrenComponents,
        appContent: props.children?.appContent,
      },
    });
  }

  override render(): string {
    const { title, isOpen } = this.props;
    return template({ dialogId: this._dialogId, title, isOpen });
  }

  openDialog(): void {
    this.setProps({ isOpen: true });
    const dialog = document.getElementById(this._dialogId) as HTMLDialogElement;
    (dialog as any).showModal();
    dialog.addEventListener('cancel', this._closeEventListener);
  }

  private _cancel(): void {
    this.setProps({ isOpen: false });
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this._onClose();
  }

  private _confirm(): void {
    this.setProps({ isOpen: false });
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
    this._onClose();
  }

  private _onClose(): void {
    const dialog = document.getElementById(this._dialogId) as HTMLDialogElement;
    dialog.removeEventListener('cancel', this._closeEventListener);
    (dialog as any).close();
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setProps({ isOpen: false });
  }

  private _closeEventListener: EventListener = (e) => {
    e.preventDefault();
    this._onClose();
  };
}
