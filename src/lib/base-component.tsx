import { IStateListener, StateListener } from "./state-listener";
import ErrorIcon from '@material-ui/icons/Warning';
import { Component } from 'react';
export class BaseComponent<P, S> extends Component<P, S>{
    devElement: any;
    renderContent(): any {
        throw new Error("Method not implemented.");
    }

    base: any;
    linkState: any;
    state: S;
    refs: any;
    stateListener: IStateListener[];
    constructor(props: P) {
        super(props);
        this.repatch = this.repatch.bind(this);
        this.state = {} as any;
        this.stateListener = React.Children.toArray(this.props.children || [])
            .filter((r: React.ReactElement<any>) => r.type == StateListener)
            .map(child => (child as any).props);


    }
    componentDidMount() {
        const { root } = this.refs;
        root && Object.assign(root, { vdom: this, componentRef: this });

    }
    repatch(delta: Partial<S>, target?) {
        if (window['repatchDebug']) debugger;
        target = target || this.state;
        Object.assign(target, delta);
        const keys = Object.keys(delta);
        if (this.stateListener && this.stateListener.length) {
            for (var key in keys) {
                const matchedStateListeners = this.stateListener.filter(sl => sl.target == key);
                matchedStateListeners.forEach(sl => sl.onChange(delta[sl.target]));
            }
        }
        this.forceUpdate();
    }
    querySelectorAll<T=any>(cssSelector: string, target?: HTMLElement) {
        const { root } = this.refs;
        console.assert(!!root, `root is null@queryAllComponentRefs with ${cssSelector}`);
        return (Array.from(((target || root) as HTMLElement).querySelectorAll(cssSelector)))
            .filter((item: any) => (item as IComponentRefer<T>).componentRef)
            .map((item: any) => (item as IComponentRefer<T>).componentRef)
    }
    isRootRender() {
        const { root } = this.refs as { root: HTMLElement };
        let parent = root;
        while (parent) {
            if (parent.id == 'root') break;
            parent = parent.parentElement;

        }
        return !!parent;
    }
    setPageTitle(title) {
        let counter = 0;
        function applyPageTitle() {
            const { root } = this.refs as { root: HTMLElement };

            if (!root && counter++ < 10) {
                setTimeout(applyPageTitle.bind(this), 20);
                return;
            }
            let parent = root;
            while (parent) {
                if (parent.id == 'root') break;
                parent = parent.parentElement;
            }
            root.setAttribute('data-page-title', title);
            root.classList.add('page-title-value');
            this.pageTitle = title;
            if (!!parent)
                document.title = title;
        }
        applyPageTitle.apply(this);

    }
    render() {
        if (this.devElement) {
            return <div ref="root" className="developer-features">
                {this.devElement}
            </div>
        }
        return this.renderContent();
    }
    renderErrorMode(title,subtitle){
        return (<section className="error-mode hero is-danger is-centered" dir="ltr" ref="root">
        <div className="hero-body"  dir="ltr">
          <div className="container"  dir="ltr">
            <p className="title"  dir="ltr">
            {<ErrorIcon />}
             {title}
            </p>
            <p className="subtitle"  dir="ltr">
              {subtitle}               
            </p>
          </div>
        </div>
      </section>);
    }
}
export function CriticalContent(p: { permissionKey: string, children?}) {

    return <div className={"critical-content"} data-key={p.permissionKey}>{p.children}</div>
}