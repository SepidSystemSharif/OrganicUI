import { assignVendors } from './imported-vendors';
assignVendors();
import * as FabricUI from 'office-ui-fabric-react';
export { FabricUI };

import * as ReactDataGrid from 'react-data-grid';
export { ReactDataGrid };

export { NotFoundView } from './views/404';
export { registryFactory } from './lib/registry-factory';
export { editorByAccessor, i18n, icon, menuBar, i18nAttr } from './lib/shared-vars';
export { listViews, tags, reports, acl, dashboardBlocks } from './lib/shared-vars';
export { funcAsComponentClass, FuncComponent } from './lib/functional-component';
export { BaseComponent, CriticalContent } from './lib/base-component';
export { PureComponent, Component, createElement, cloneElement } from 'react';
export { route, routeTable } from './lib/router';
export { Utils, changeCase } from './lib/utils';
export { /*remoteApiProxy, remoteApi, refetch,*/ createClientForREST } from './lib/rest-api';
export { IStateListener, StateListener } from './lib/state-listener';
export { mountViewToRoot, renderViewToComplete, startApp, setAfterLoadCallback, appData, scanAllPermission } from './lib/bootstrapper';
export { SubRender, Action, Event } from './lib/decorators';
export { Field, ObjectField } from './lib/data';
export { Spinner } from './lib/spinner';
export { Menu } from './lib/models';
export { AdvButton, DropDownButton, IPanelProps, Panel, Placeholder, SearchInput } from './lib/ui-kit';
export { default as SimpleTable } from './lib/simple-table';
export { DataList } from './lib/data-list';
export { DataForm, DataPanel, DataListPanel } from './lib/data-form';
export { AppUtils } from './lib/app-utils';
export { SingleViewBox } from './lib/single-view-box';
export { ViewBox } from './lib/view-box';

export { DashboardBox } from './lib/dashboard-box';
export { ReportViewBox } from './lib/report-view-box';
export { ListViewBox } from './lib/list-view-box';
export { devTools, JsonInspector, DeveloperBar,isProdMode } from './lib/developer-features';
export { DataLookup } from './lib/data-lookup';
export { TreeList } from './lib/tree-list';
export { ComboBox } from './lib/combo-box'
export { FilterPanel } from './lib/filter-panel';
import "./customization-material";
export { AppBar, IconButton, Toolbar, TextField } from '@material-ui/core';
export let currentView: any
export { DatePicker } from './lib/date-picker';

export { default as JssProvider } from 'react-jss/lib/JssProvider';
export { createGenerateClassName } from '@material-ui/core/styles';
export { default as MenuIcon } from '@material-ui/icons/Menu';
export { default as ExpandMoreIcon } from '@material-ui/icons/ExpandMore';
 
export { Callout } from 'office-ui-fabric-react/lib/Callout';
export { default as Collapsible } from 'react-collapsible';
export { MessageBar } from './lib/message-bar';
export { TimeSlot } from './lib/time-slot';