/// <reference path="../dts/globals.d.ts" />

import { BaseComponent } from './base-component';
import { icon, i18n } from './shared-vars';
import { Utils } from './utils';

import { Field } from './data';
import { listViews } from './shared-vars';
import { ReactElement, isValidElement } from 'react';

import { isDevelopmentEnv } from './developer-features';
const { OverflowSet, SearchBox, DefaultButton, css } = FabricUI;

interface SingleViewBoxState { formData: any; validated: boolean; }
function loadScript(url) {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = () => 0;
    document.head.appendChild(scriptTag);
}
export interface OrganicBoxProps<TActions, TOptions, TParams> {
    actions: TActions;
    options: TOptions;
    params: TParams;
    customActions?: Partial<TActions>;
    children?: React.ReactNode;

}
export default class OrganicBox<TActions, TOptions, TParams, S> extends BaseComponent<OrganicBoxProps<TActions, TOptions, TParams>, S> {
    devPortId: number;
    actions: TActions;
    showDevBoard(msg): any {
        const boards = Array.from(document.querySelectorAll('#dev-server-board'));
        boards.forEach(board => {
            board.classList.add('active');
            board.innerHTML = msg;
        });
    }

    serverChanged() {
        this.showDevBoard('server files is changed, building bundle started...');

    }
    webSocket: WebSocket;

    private reloadAllTargetedItems() {

        const boards = Array.from(document.querySelectorAll('#dev-server-board'));
        boards.forEach(board => {
            board.classList.add('active');
            board.innerHTML = 'reloading...';
        });
        localStorage.setItem('will-reload', (((+new Date()) + 2000) + ''));

        setTimeout(() => {
            location.reload()
        }, 100);
        localStorage.setItem('stableState', JSON.stringify(this.state));

        /*   Array.from(document.querySelectorAll('script'))
               .filter(scriptElement => scriptElement.getAttribute('data-target') == 'development')
               .forEach(({ src }) => loadScript(src));
   */

    }
    static instanceCounter = 0;

    constructor(p: OrganicBoxProps<TActions, TOptions, TParams>) {
        super(p);
        this.actions = Object.assign({}, p.actions, p.customActions || {});
        this.devPortId = Utils.accquireDevPortId();
        const stableState = localStorage.getItem('stableState')
        const counter = OrganicBox.instanceCounter++;

        if (stableState && counter == 0) {
            // localStorage.removeItem('stableState');
            const state = JSON.parse(stableState)

            setTimeout(() => this.setState(state), 100);


            const willReload = +localStorage.getItem('will-reload');
            if (!!willReload) {
                localStorage.removeItem('will-reload');
                localStorage.setItem('stableState', JSON.stringify(this.state));

                this.showDevBoard('forced reloading... ');

                location.reload();

            }
        }
        if (isDevelopmentEnv() && counter == 0) {
            try {
                this.webSocket = new WebSocket(`ws://${location.host}/watch`);
                this.webSocket.onmessage = ({ data }) => {
                    data = JSON.parse(data);

                    (data == 'reloadAllTargetedItems' && this.reloadAllTargetedItems()) ||
                        (data == 'serverChanged' && this.serverChanged())
                };
            } catch (exc) { }
        }
    }
}
