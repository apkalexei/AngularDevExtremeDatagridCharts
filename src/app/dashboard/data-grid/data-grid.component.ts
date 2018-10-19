import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



import { DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';




@Component({
    moduleId: module.id,
    styleUrls: ['./data-grid.component.css'],
    selector: 'data-grid-app',
    templateUrl: './data-grid.component.html'
})
export class DataGridComponent {
    dataSource: any = {};

    constructor(http: Http) {
        this.dataSource.store = new CustomStore({
            load: function (loadOptions: any) {
                var params = '?';

                params += 'skip=' + loadOptions.skip || 0;
                params += '&take=' + loadOptions.take || 12;

                if(loadOptions.sort) {
                    params += '&orderby=' + loadOptions.sort[0].selector;
                    if(loadOptions.sort[0].desc) {
                        params += ' desc';
                    }
                }
                return http.get('https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems' + params)
                    .map((r) => r.json())
                    .toPromise()
                    .then((data: any) => {
                        return {
                            data: data.items,
                            totalCount: data.totalCount
                        }
                    })
                    .catch(error => { throw 'Data Loading Error' });
            }
        });
    }
}

