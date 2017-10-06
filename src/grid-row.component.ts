import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IEntity } from './IEntity';
import { IGridRow } from './IGridRow';

@Component({
  selector: 'app-row',
  template: `
  <tbody *ngIf="items">
  <tr *ngFor="let item of items">
      <td *ngFor="let col of item.columns" class="grid-cell">
          <ng-template [ngIf]="col.type == 'ACTIONS'">
              <button type="button" (click)="editItem(item.entity, $event)" class="btn btn-primary btn-sm" data-hover="tooltip" title="Edit"><i class="fa fa-pencil"></i></button>
              <button type="button" (click)="deleteItem(item.entity)" class="btn btn-danger btn-sm" data-hover="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button>
          </ng-template>
          <ng-template [ngIf]="col.type == 'DATE'">
              {{col.value | date: 'dd/MM/yyyy'}}
          </ng-template>
          <ng-template [ngIf]="col.type == 'CUSTOM'">
                  <span>{{col.value}}</span>
              </ng-template>
          <ng-template [ngIf]="col.type == undefined">
              {{col.value}}
          </ng-template>
      </td>

  </tr>
  <tr *ngIf="!items.length">
      <td>&nbsp;</td>
      <td colspan="5">No Records Found</td>
  </tr>
</tbody>
  `
})
export class GridRowComponent implements OnInit {
  @Input() items: IGridRow[] = [];
  @Output() onItemEdit: EventEmitter<IEntity> = new EventEmitter();
  @Output() onItemDelete: EventEmitter<IEntity> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  editItem(entity: IEntity, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.onItemEdit.emit(entity);
  }

  deleteItem(entity: IEntity, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.onItemDelete.emit(entity);
  }
}
