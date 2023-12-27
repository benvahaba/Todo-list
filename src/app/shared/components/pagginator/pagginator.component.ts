import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagginator.component.html',
  styleUrl: './pagginator.component.scss',
})
export class PagginatorComponent implements OnInit, OnChanges {
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  public totalPages: number;

  ngOnInit(): void {
    this.setTotalPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.itemsPerPage && !changes.itemsPerPage.firstChange) ||
      (changes.totalItems && !changes.totalItems.firstChange)
    ) {
      this.setTotalPages();
    }
  }

  setTotalPages() {
    this.totalPages = !this.itemsPerPage
      ? undefined
      : Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }
}
