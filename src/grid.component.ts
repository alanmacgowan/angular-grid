import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { IEntity } from './IEntity';
import { ISortResult } from './ISortResult';
import { IGridColumn } from './IGridColumn';
import { IGridRow } from './IGridRow';

@Component({
  selector: 'app-grid',
  template: `
    <div class="panel panel-green">
    <div class="panel-heading">{{title}}</div>
    <div class="panel-body">
        <table *ngIf="rows" class="table table-hover">
            <app-header [columns]="columns" (onSort)="sort($event)"></app-header>
            <app-row [items]="rows" (onItemEdit)="editItem($event)" (onItemDelete)="deleteItem($event)"></app-row>
        </table>
        <app-pagination [totalItems]="totalItems" [pageSize]="pageSize" (onPageChanged)="pageChange($event)"></app-pagination>
    </div>
  </div>
  `,
  styles: [
    `
  .grid-cell {
    padding: 8px;
    width: 1%;
}
.grid-header{
    cursor: pointer;
    text-align: left;
}
.box-heading {
  font-weight: bold;
  font-family: 'Oswald';
  margin-bottom: 15px;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 100%;
}
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  line-height: 1.42857143;
  color: #999999;
  background-color: #f0f2f5;
  height: 100%;
}
.table tbody tr td {
  border-top: 1px solid #efefef;
}
textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus {
  border-color: #999999;
  box-shadow: none;
  outline: 0 none;
}
a:focus,
.btn:focus {
  outline: 0 !important;
}
.img-circle {
  border-radius: 50% !important;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
}
.panel {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  -webkit-border-radius: 0 !important;
  -moz-border-radius: 0 !important;
  border-radius: 0 !important;
   border: 5px solid #e5e5e5;
    border-radius: 0 !important;
    box-shadow: none !important;
}
.panel > .panel-heading {
  font-size: 18px;
  padding: 7px 15px;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-color: #e5e5e5 !important;
}
.panel > .panel-footer {
  font-size: 18px;
  padding: 7px 15px;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.panel.panel-primary {
  border-color: #dc6767;
}
.panel.panel-primary > .panel-heading {
  color: #FFFFFF;
  background: #dc6767;
  border-color: #dc6767 !important;
}
.panel.panel-primary > .panel-footer {
  color: #FFFFFF;
  background: #dc6767;
  border-color: #dc6767 !important;
}
.panel.panel-red {
  border-color: #bf4346;
}
.panel.panel-red > .panel-heading {
  color: #FFFFFF;
  background: #bf4346;
  border-color: #bf4346 !important;
}
.panel.panel-red > .panel-footer {
  color: #FFFFFF;
  background: #bf4346;
  border-color: #bf4346 !important;
}
.panel.panel-orange {
  border-color: #e9662c;
}
.panel.panel-orange > .panel-heading {
  color: #FFFFFF;
  background: #e9662c;
  border-color: #e9662c !important;
}
.panel.panel-orange > .panel-footer {
  color: #FFFFFF;
  background: #e9662c;
  border-color: #e9662c !important;
}
.panel.panel-green {
  border-color: #488c6c;
}
.panel.panel-green > .panel-heading {
  color: #FFFFFF;
  background: #488c6c;
  border-color: #488c6c !important;
}
.panel.panel-green > .panel-footer {
  color: #FFFFFF;
  background: #488c6c;
  border-color: #488c6c !important;
}
.panel.panel-yellow {
  border-color: #f2994b;
}
.panel.panel-yellow > .panel-heading {
  color: #FFFFFF;
  background: #f2994b;
  border-color: #f2994b !important;
}



[class^="fa-"],
[class^="glyphicon-"],
[class^="icon-"],
[class*=" fa-"],
[class*=" glyphicon-"],
[class*=" icon-"] {
  display: inline-block;
  margin-top: 1px;
  font-size: 14px;
  *margin-right: .3em;
  line-height: 14px;
  -webkit-font-smoothing: antialiased;
}
li [class^="fa-"],
li [class^="glyphicon-"],
li [class^="icon-"],
li [class*=" fa-"],
li [class*=" glyphicon-"],
li [class*=" icon-"] {
  display: inline-block;
  width: 1.25em;
  text-align: center;
}
li [class^="glyphicon-"],
li [class*=" glyphicon-"] {
  top: 2px;
}
li [class^="icon-"],
li [class*=" icon-"] {
  top: 1px;
  position: relative;
}
li [class^="fa-"].icon-large,
li [class^="glyphicon-"].icon-large,
li [class^="icon-"].icon-large,
li [class*=" fa-"].icon-large,
li [class*=" glyphicon-"].icon-large,
li [class*=" icon-"].icon-large {
  width: 1.5625em;
}
.table thead tr th,
.table thead tr td {
  border-bottom: 0;
}
.table.table-sm {
  font-size: .875em;
}
.table.table-lg {
  font-size: 1.2em;
}
.table > input[type='text'] {
  font-weight: normal;
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.table select {
  font-weight: normal;
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}

.table.table-hover-color tbody tr:hover td:first-child {
  border-left: 4px solid #dc6767;
}
.table-actions {
  margin-bottom: 20px;
}
.table-actions.bottom {
  margin-bottom: 0;
  margin-top: 20px;
}
.table-actions .pagination {
  margin: 0;
}
.fixed-header {
  top: 0;
  position: fixed;
  width: auto;
  display: none;
  border: none;
  z-index: 999;
}
.page-header-breadcrumb {
  -webkit-border-radius: 0 !important;
  -moz-border-radius: 0 !important;
  border-radius: 0 !important;
}
.form-control {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border-color: #e5e5e5;
  -webkit-border-radius: 0 !important;
  -moz-border-radius: 0 !important;
  border-radius: 0 !important;
}
label {
  font-weight: normal;
}
`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  @Output() onItemEdit: EventEmitter<IEntity> = new EventEmitter();
  @Output() onItemDelete: EventEmitter<IEntity> = new EventEmitter();
  @Output() onSort: EventEmitter<ISortResult> = new EventEmitter();
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter();

  @Input() columns: IGridColumn[] = [];
  @Input() rows: IGridRow[] = [];
  @Input() title: string;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 5;

  constructor() {}

  ngOnInit() {}

  sort(sort: ISortResult) {
    this.onSort.emit(sort);
  }

  editItem(entity: IEntity) {
    this.onItemEdit.emit(entity);
  }

  deleteItem(entity: IEntity) {
    this.onItemDelete.emit(entity);
  }

  pageChange(page: number) {
    this.onPageChanged.emit(page);
  }
}
