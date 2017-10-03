import { Component, OnInit } from '@angular/core';
import { IGridColumn } from '../src/IGridColumn';
import { IGridRow } from '../src/IGridRow';
import { ISortResult } from '../src/ISortResult';
import { Book } from './Book';

@Component({
  selector: 'app-demo-app',
  template: `
  <app-grid title="Books" [rows]="rows" [columns]="columns" (onItemEdit)="itemEdit($event)" (onItemDelete)="itemDelete($event)"
  (onSort)="sort($event)" [totalItems]="totalRecords" [pageSize]="pageSize" (onPageChanged)="pageChanged($event)">
  </app-grid>
  `
})
export class DemoComponent implements OnInit {
  totalRecords: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  currentSort: string = '_id';
  currentSortOrder: number = 1;
  columns: IGridColumn[] = [];
  rows: IGridRow[] = [];

  constructor() {}

  pageChanged(page: number) {
    this.currentPage = page;
    this.getBooksPaged(
      this.currentPage,
      this.currentSort,
      this.currentSortOrder
    );
  }

  getBooksPaged(page: number, sort?: string, order?: number) {
    this.rows = [];
    this.totalRecords = 2;
    this.rows.push(
      {
        entity: new Book('1'),
        columns: [
          { type: 'ACTIONS', value: '' },
          { value: 'Book 1' },
          { type: 'DATE', value: new Date() },
          { value: 'Alan Mac' },
          { type: 'CUSTOM', value: 'Comedy' }
        ]
      },
      {
        entity: new Book('2'),
        columns: [
          { type: 'ACTIONS', value: '' },
          { value: 'Book 2' },
          { type: 'DATE', value: new Date() },
          { value: 'John Perez' },
          { type: 'CUSTOM', value: 'Drama' }
        ]
      }
    );
  }

  sort(sort: ISortResult) {
    this.currentSort = sort.column;
    this.currentSortOrder = sort.order;
    this.getBooksPaged(
      this.currentPage,
      this.currentSort,
      this.currentSortOrder
    );
  }

  ngOnInit() {
    this.getBooksPaged(1);

    this.columns = [
      { title: 'Action', name: '_id', type: 'ACTIONS' },
      { title: 'Name', name: 'title', type: '' },
      { title: 'Date', name: 'publishDate', type: '' },
      { title: 'Authors', name: 'authors', type: '' },
      { title: 'Category', name: 'category', type: '' }
    ];
  }
}
