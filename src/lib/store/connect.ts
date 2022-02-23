import { Block } from '../Block/Block';
import { IComponentProps } from '../interfaces/component-props.interface';
import { GlobalState, Store, STORE_EVENT } from './store';

interface BlockConstructable {
  new (tagName: string, props: unknown, _rootElementId?: string): Block;
}

export type MapStateToProps<TProps extends IComponentProps> = (
  globalState: GlobalState,
) => Partial<TProps>;

export function connect<
  TComponent extends BlockConstructable,
  TProps extends IComponentProps,
>(Component: TComponent, mapStateToProps: MapStateToProps<TProps>) {
  // @ts-ignore
  return class extends Component {
    constructor(
      tag: string,
      props = {} as IComponentProps,
      _rootElementId = undefined,
    ) {
      const store = new Store();
      super(
        tag,
        { ...props, ...mapStateToProps(store.getState()) },
        _rootElementId,
      );
      store.on(STORE_EVENT.UPDATE, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
