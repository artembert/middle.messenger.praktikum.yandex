import { v4 } from 'uuid';
import { IComponentProps } from '../interfaces/component-props.interface';
import { EventBus } from '../event-bus/event-bus';
import { EventDispatcher } from '../event-dispatcher/event-dispatcher';

export abstract class Block<TProps extends IComponentProps = {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public props: TProps;

  protected readonly eventDispatcher = new EventDispatcher();

  protected node?: HTMLElement;

  protected readonly eventBus = new EventBus();

  private _id = v4();

  private readonly _rootElementId: string | undefined;

  private readonly _meta: { tagName: string; props: TProps };

  private _internalEventListeners: Record<string, EventDispatcher> = {};

  private _element!: HTMLElement;

  constructor(
    tagName = 'div',
    props: TProps = {} as TProps,
    _rootElementId?: string,
  ) {
    this._meta = {
      tagName,
      props,
    };
    this.props = makePropsProxy({ ...props, __id: this._id });
    this._rootElementId = _rootElementId;
    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  get element(): HTMLElement {
    return this._element;
  }

  leave() {
    this.eventBus.emit(Block.EVENTS.FLOW_CWU);
  }

  setProps(nextProps: TProps) {
    const oldProps = { ...this.props };
    const isPropsChanged = this._checkIsPropsChanged(nextProps);
    if (isPropsChanged) {
      Object.assign(this.props, nextProps);
      this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
    }
  }

  getContent() {
    return this.element.outerHTML;
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(): void {}

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount(): void {}

  show() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  }

  protected init() {
    const {
      tagName,
      props: { classNames = [] },
    } = this._meta;
    const element = document.createElement(tagName);
    classNames.forEach((name) => {
      element.classList.add(name);
    });
    this._element = element;
    this.eventDispatcher.node = this._element;

    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  /* eslint-disable class-methods-use-this, @typescript-eslint/no-unused-vars */

  // @ts-ignore
  protected componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    return newProps !== oldProps;
  }

  /* eslint-enable class-methods-use-this, @typescript-eslint/no-unused-vars */

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const shouldBeUpdated = this.componentDidUpdate(oldProps, newProps);
    if (shouldBeUpdated) {
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

    if (this._rootElementId) {
      const rootElement = document.getElementById(this._rootElementId);
      if (rootElement) {
        rootElement.innerHTML = '';
        rootElement.appendChild(this.element);
      }
    }

    this._detachEvents();
    this._detachInternalEvents();

    this._addChildrenComponents();
    this._updateClassNames();
    this._updateAttributes();

    this._addInternalEvents();
    this._addEvents();
  }

  private _detachEvents(): void {
    this.eventDispatcher.clear();
  }

  private _detachInternalEvents(): void {
    this._internalEventListeners = {};
  }

  private _updateClassNames(): void {
    if (this._element && this.props.classNames) {
      this._element.classList.remove(...this._element.classList);
      this._element.classList.add(...this.props.classNames);
    }
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

  private _addChildrenComponents(): void {
    const { children = {} } = this.props;

    Object.entries(children).forEach(
      ([childTag, childBlock]: [string, Block]) => {
        const childrenAnchors = this._element.getElementsByTagName(childTag);
        if (childrenAnchors?.length > 0) {
          Array.from(childrenAnchors).forEach((anchor) => {
            const block = childBlock.element;
            anchor.replaceWith(block);
          });
        }
      },
    );
  }

  private _addInternalEvents(): void {
    const { internalEvents = {} } = this.props;
    Object.entries(internalEvents).forEach(([selector, listeners]) => {
      const targetElement = this._element.querySelector(selector);
      if (targetElement) {
        this._internalEventListeners[selector] = new EventDispatcher(
          targetElement,
        );
        Object.entries(listeners).forEach(([event, handler]) => {
          this._internalEventListeners[selector].add(event, handler);
        });
      }
    });
  }

  private _checkIsPropsChanged(nextProps: TProps): boolean {
    const nextKeys = Object.keys(nextProps);
    return !nextKeys.every(
      (key: keyof TProps) => nextProps[key] === this.props[key],
    );
  }

  abstract render(): string;
}

function makePropsProxy<TProps extends {}>(props: TProps) {
  return new Proxy(props, {
    set: (target: TProps, prop: string, value) => {
      /* eslint-disable no-param-reassign */
      // @ts-ignore
      target[prop] = value;
      /* eslint-enable no-param-reassign */
      return true;
    },
    deleteProperty() {
      throw new Error('Отказано в доступе');
    },
  });
}
