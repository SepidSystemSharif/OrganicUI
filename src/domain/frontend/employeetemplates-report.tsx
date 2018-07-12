/// <reference path="../../dts/globals.d.ts" />
/// <reference path="entities.d.ts" />
/// <reference path="api.d.ts" />


import { ReportViewBox,routeTable } from  '@organic-ui'; 
const reportView = (params) =>
    (<ReportViewBox actions={null} options={null} params={params} >


    </ReportViewBox>);
routeTable.set('/view/admin/reports/employeetemplates', reportView);
