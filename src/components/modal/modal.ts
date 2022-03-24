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
  onConfirm?: () => void;
  onCancel?: () => void;
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
    super('div', props);
    this.setProps({
      children: {
        ...this._childrenComponents,
        appContent: props.children?.appContent,
      },
    });
  }

  override render(): string {
    const { title, open } = this.props;
    return template({ dialogId: this._dialogId, title, open });
  }

  _openDialog(): void {
    const dialog = document.getElementById(this._dialogId) as HTMLDialogElement;
    (dialog as any).showModal();
  }

  private _cancel(): void {
    const dialog = document.getElementById(this._dialogId) as HTMLDialogElement;
    (dialog as any).close();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  private _confirm(): void {
    const dialog = document.getElementById(this._dialogId) as HTMLDialogElement;
    (dialog as any).close();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
}
