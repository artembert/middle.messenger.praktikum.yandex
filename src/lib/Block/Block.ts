import { v4 } from 'uuid';
import { IComponentProps } from '../interfaces/component-props.interface';
import { EventBus } from '../EventBus/EventBus';
import { EventDispatcher } from '../EventDispatcher/EventDispatcher';

export abstract class Block {
  private _id = v4();

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public props: IComponentProps;

  protected readonly eventDispatcher = new EventDispatcher();

  protected node?: HTMLElement;

  private readonly _meta: { tagName: string; props: IComponentProps };

  protected readonly eventBus = new EventBus();

  constructor(tagName = 'div', props: IComponentProps = {}) {
    this._meta = {
      tagName,
      props,
    };
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _element: any;

  get element() {
    return this._element;
  }

  leave() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  }

  setProps(nextProps: IComponentProps) {
    if (!nextProps) {
      return;
    }
    this.eventBus.emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);

    Object.assign(this.props, nextProps);
  }

  getContent() {
    return this.element.outerHTML;
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(): void {}

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount(): void {}

  abstract render(): string;

  protected init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  protected show() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  }

  // eslint-disable-next-line class-methods-use-this
  protected componentDidUpdate() {
    return true;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = document.createElement(tagName);
    this.eventDispatcher.node = this._element;
  }

  private _makePropsProxy(props: IComponentProps) {
    const self = this;
    return new Proxy(props, {
      set(target: IComponentProps, prop: string, value) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  private _render(): void {
    const block = this.render();

    if (this._element) {
      this._element.innerHTML = block;
      const currentElement = document.querySelector(`[data-id='${this._id}']`);
      currentElement?.parentNode?.replaceChild(this.element, currentElement);
    }

    this.eventDispatcher.clear();
    this._updateChildren();
    this._updateAttributes();
    this._addEvents();
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this.eventDispatcher.add(eventName, events[eventName]);
    });
  }

  private _updateAttributes() {
    const { attributes = {} } = this.props;
    this._element.setAttribute('data-id', this._id);
    Object.keys(attributes).forEach((attributeName) => {
      if (attributes[attributeName]) {
        this._element.setAttribute(attributeName, attributes[attributeName]);
      }
    });
  }

  private _updateChildren() {
    const { children = {} } = this.props;

    if (Array.isArray(children)) {
      this._element.innerHTML = '';
      children.forEach((child) => {
        this._element.appendChild(child.element);
      });
    } else {
      Object.keys(children).forEach((childName) => {
        const oldEl = this._element.querySelector(
          `[data-id='${children[childName]._id}']`,
        );
        if (oldEl) {
          oldEl.replaceWith(children[childName].element);
        }
      });
    }
  }
}
