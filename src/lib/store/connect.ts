import { IComponentProps } from '../interfaces/component-props.interface';
import { GlobalState, Store, STORE_EVENT } from './store';
import { IPage, IPageConstructorParams } from '../models/page.interface';

export type MapStateToProps<TProps extends IComponentProps> = (
  globalState: GlobalState,
) => Partial<TProps>;

export function connect<
  TComponent extends IPage,
  TProps extends IComponentProps,
>(
  mapStateToProps: MapStateToProps<TProps>,
): (Component: TComponent) => TComponent {
  return function wrapWithConnect(Component: TComponent) {
    // @ts-ignore
    return class extends Component {
      constructor({
        rootId,
        props = {} as IComponentProps,
      }: IPageConstructorParams) {
        const store = new Store();
        super({
          props: { ...props, ...mapStateToProps(store.getState()) },
          rootId,
        });
        store.on(STORE_EVENT.UPDATE, () => {
          this.setProps({ ...mapStateToProps(store.getState()) });
        });
      }
    };
  };
}
