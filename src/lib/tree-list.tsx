/// <reference path="../organicUI.d.ts" />

import { BaseComponent } from './base-component';
import { Utils } from './utils';
import { Checkbox } from '@material-ui/core';
interface ITreeListProps {
    value?: ITreeListNode[];
    onChange?: (nodes) => any;
    height: number;
}
export class TreeList extends BaseComponent<ITreeListProps, any>{
    nodes: ITreeListNode[];
    constructor(p) {
        super(p);
    }
    isLeafNode(node: ITreeListNode): any {
        if (!('isLeaf' in node)) node.isLeaf = !this.nodes.some(n => n.parentKey == node.key);

        return !!node.isLeaf;
    }
    changeType(targetNode: ITreeListNode, delta: string | number) {
        targetNode.type = delta == '+' ? (((targetNode.type || 0) + 1) % 3) : +(delta);

        if (!this.isLeafNode(targetNode)) {
            this.nodes
                .filter(x => x.parentKey == targetNode.key)
                .forEach(x => this.changeType(x, targetNode.type));
        }

        this.forceUpdate();
        this.props.onChange(this.nodes);
    }
    static checkBoxClassNames = ["type-flag type-flag0 fa fa-square-o",
        "type-flag  type-flag1 fa fa-check-square ",
        "type-flag  type-flag2 fa   fa-times-rectangle ",
        "type-flag  type-flag3 fa  fa-dot-circle-o  "];
    renderNodes(parentId) {
        if (this.nodes instanceof Array && this.nodes.length == 0) this.nodes = null;

        this.nodes = this.nodes || (this.props.value instanceof Array ? JSON.parse(JSON.stringify(this.props.value)) : []);
        const nodes = this.nodes.filter(n => n.parentKey == parentId);
        if (nodes.length == 0) return null;
        return <ul className={parentId ? "subitems" : ""}>
            {nodes.map(node => ([<li key={node.key} className={
                Utils.classNames(node.expaneded ? "expanded" : "collapsed", this.isLeafNode(node) ? 'leaf ' : '')}  >
                <span className={"expandIcon"} onClick={() => (node.expaneded = !node.expaneded, this.forceUpdate())} >
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </span>

                <span className="node">

                    <Checkbox color={node.type == 2 ? "secondary" : "primary"} onClick={() => this.changeType(node, '+')}
                        checked={!!node.type} indeterminate={node.type == 2}
                        centerRipple
                        checkedIcon={undefined && <i className={TreeList.checkBoxClassNames[(node.type || 0)]} style={{ fill: "#ff0000" }} />}
                    />
                    <span>{node.text}</span>

                    <span className="choices" >
                        <i className="choice-flag  fa fa-square" onClick={() => this.changeType(node, 0)} ></i>
                        <i className="choice-flag  fa fa-check-square " onClick={() => this.changeType(node, 1)} ></i>
                        <i className="choice-flag  fa fa-times-rectangle " onClick={() => this.changeType(node, 2)} ></i>
                    </span>
                </span>

                {this.renderNodes(node.key)}
            </li>]))}
        </ul>

    }
    render() {
        const p = this.props;
        return <div className="tree-list" style={{ maxHeight: `${p.height}px`,height: `${p.height}px`, overflow: 'scroll', overflowX: 'hidden' }}>
            {this.renderNodes(0)}
        </div>
    }
}
TreeList['field-className'] = 'no-material no-label';