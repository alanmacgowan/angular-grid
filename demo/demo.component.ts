import { Component, OnInit } from '@angular/core';
import { IGridColumn } from '../src/IGridColumn';
import { IGridRow } from '../src/IGridRow';
import { ISortResult } from '../src/ISortResult';
import { Book } from './Book';
import { IEntity } from '../src/IEntity';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { IPagedResults } from '../src/IPagedResults';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as _ from 'underscore';

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

  _baseUrl: string = '';
  books: Book[];

  constructor(private http: Http) {}

  pageChanged(page: number) {
    this.currentPage = page;
    this.getBooksPaged(
      this.currentPage,
      this.currentSort,
      this.currentSortOrder
    );
  }

  getBooks(page: number, sort: string, order?: number): Observable<Book[]> {
    return this.http
      .get(this._baseUrl + 'books.json')
      .map((res: Response) => {
        this.books = res.json();

        this.totalRecords = this.books.length;
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = Math.min(
          startIndex + this.pageSize - 1,
          this.totalRecords - 1
        );

        if (order === 1) {
          this.books = _.sortBy(this.books, sort);
        } else {
          this.books = _.sortBy(this.books, sort).reverse();
        }

        return this.books.slice(startIndex, endIndex + 1);
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  getBooksPaged(page: number, sort: string, order?: number) {
    this.rows = [];
    this.getBooks(page, sort, order)
      .map((response: Book[]) => {
        this.rows = [];
        return response;
      })
      .flatMap((response: Book[]) => response)
      .subscribe(
        (book: Book) => {
          this.rows.push({
            entity: book,
            columns: [
              { type: 'ACTIONS', value: '' },
              { value: book.title },
              { type: 'DATE', value: book.publishDate },
              { value: book.authors },
              { type: 'CUSTOM', value: book.category }
            ]
          });
        },
        (error: string) => {
          console.log(error);
        },
        () => {
          console.log('book retrieval completed');
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
    this.getBooksPaged(1, '_id');

    this.columns = [
      { title: 'Action', name: '_id', type: 'ACTIONS' },
      { title: 'Name', name: 'title', type: '' },
      { title: 'Date', name: 'publishDate', type: '' },
      { title: 'Authors', name: 'authors', type: '' },
      { title: 'Category', name: 'category', type: '' }
    ];
  }

  itemDelete(book: Book) {
    alert('delete item');
  }

  itemEdit(entity: IEntity) {
    alert('edit item');
  }
}
