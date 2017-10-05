import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ISortResult } from './ISortResult';
import { IGridColumn } from './IGridColumn';

@Component({
  selector: 'app-header',
  template: `
  <thead>
  <tr>
      <th *ngFor="let column of columns" class="grid-cell grid-header" >
          <span (click)="sort(column.name)">{{column.title}} <span *ngIf="currentSort == column.name">&nbsp;<i [class]="sortClass"></i></span>
          </span>
      </th>
  </tr>
</thead>
  `
})
export class GridHeaderComponent implements OnInit {
  @Input() columns: IGridColumn[] = [];
  @Output() onSort: EventEmitter<ISortResult> = new EventEmitter();

  currentSort: string;
  currentSortOrder: number = 1;
  sortClass: string = 'fa fa-sort-desc';

  sort(column: string, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.currentSort = column;
    this.currentSortOrder = this.currentSortOrder === 1 ? -1 : 1;
    this.sortClass =
      this.currentSortOrder === 1 ? 'fa fa-sort-desc' : 'fa fa-sort-asc';
    const sort = { column: this.currentSort, order: this.currentSortOrder };
    this.onSort.emit(sort);
  }

  constructor() {}

  ngOnInit(): void {}
}
