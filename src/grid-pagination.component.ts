import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'grid-pagination',
  template: `
  <nav [hidden]="!isVisible">
  <ul class="pagination">
    <li [class.disabled]="!previousEnabled" (click)="previousNext(-1, $event)">
      <a aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li *ngFor="let page of pages" (click)="changePage(page, $event)" [class.active]="currentPage === page">
      <a>{{ page }}</a>
    </li>
    <li [class.disabled]="!nextEnabled" (click)="previousNext(1, $event)">
      <a aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
  `,
  styles: [
    `
  .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
    background-color: #027FF4;
    border-color: #027FF4;
  }
  
  .pagination a {
      cursor: pointer;
  }
  `
  ]
})
export class PaginationComponent implements OnInit {
  private pagerTotalItems: number;
  private pagerPageSize: number;

  totalPages: number;
  pages: number[] = [];
  currentPage: number = 1;
  isVisible: boolean = false;
  previousEnabled: boolean = false;
  nextEnabled: boolean = true;

  @Input()
  get pageSize(): number {
    return this.pagerPageSize;
  }

  set pageSize(size: number) {
    this.pagerPageSize = size;
    this.update();
  }

  @Input()
  get totalItems(): number {
    return this.pagerTotalItems;
  }

  set totalItems(itemCount: number) {
    this.pagerTotalItems = itemCount;
    this.update();
  }

  @Output() onPageChanged: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  update() {
    if (this.pagerTotalItems && this.pagerPageSize) {
      this.totalPages = Math.ceil(this.pagerTotalItems / this.pageSize);
      this.isVisible = true;
      if (this.totalItems >= this.pageSize) {
        for (let i = 1; i < this.totalPages + 1; i++) {
          if (this.pages.indexOf(i) === -1) {
            this.pages.push(i);
          }
        }
      }
      return;
    }

    this.isVisible = false;
  }

  previousNext(direction: number, event?: MouseEvent) {
    let page: number = this.currentPage;
    if (direction == -1) {
      if (page > 1) page--;
    } else {
      if (page < this.totalPages) page++;
    }
    this.changePage(page, event);
  }

  changePage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (this.currentPage === page) return;
    this.currentPage = page;
    this.previousEnabled = this.currentPage > 1;
    this.nextEnabled = this.currentPage < this.totalPages;
    this.onPageChanged.emit(page);
  }
}
