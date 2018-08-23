/// <reference path="../../dts/organic-ui.d.ts" />
import { reinvent } from "./reinvent";
import { Utils } from "../core/utils";
import { Spinner } from '../core/spinner';
import { openBindingSource } from "./binding-source";
import { IActionsForCRUD } from "@organic-ui";
import { routeTable } from "../core/router";
interface IParams<TDto> { actions: OrganicUi.IActionsForCRUD<TDto>,customActions, options: OrganicUi.IOptionsForCRUD };
function classFactory<TDto>(p: IParams<TDto>):
    OrganicUi.IReinventForCRUD<TDto> {
    const chainMethods = ['configureFields', 'singleView', 'listView', 'size'];
    let { actions, options,customActions } = p;
    customActions= customActions || {};
    const AClass = reinvent.baseClassFactory({ chainMethods, className: 'crud' });
    function doneFunc() {

        routeTable.set(p.options.routeForSingleView, AClass, { mode: 'single-view' });
        routeTable.set(p.options.routeForListView, AClass, { mode: 'list-view' });
    }
    function beforeSave(callback){
        Object.assign(customActions,{beforeSave:callback});
        return AClass;
    }
    function getRenderParams(target) {
        const { state } = target;
        const { data } = target.state;
        return {
            state: target.target || {}, props: target.props,
            data, bindingSource: openBindingSource<TDto>(),
            binding: openBindingSource(),
            repatch: target.repatch.bind(target),
            runAction: target.runAction.bind(this),
            root: target.refs.root,
            subrender: target.subrender.bind(target),
            showModal: target.showModal.bind(target)
        };

    }
    AClass.renderer(p => {
        const { id } = p.props, { data } = p.state;
        if (data instanceof Promise) return <div ref="root" className="flex-center flex-full-center">
            <Spinner />
        </div>;
        const targetKey = id ? 'singleView' : 'listView';
        const componentClass = reinvent.templates[targetKey];
        const result = AClass.applyChain(targetKey, p) as React.ReactElement<any>;
        const children = React.Children.toArray(result.props.children);
        return React.createElement(componentClass, { actions, params: p.props, options,customActions }, ...children);
    });
    return Object.assign(AClass, { options, getRenderParams,beforeSave, doneFunc, actions, dataLookupActions: actions, dataLookupOptions: options }) as any;
}
reinvent.factoryTable['frontend:crud'] = classFactory;