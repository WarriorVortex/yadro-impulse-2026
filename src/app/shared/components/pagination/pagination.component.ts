import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, NzPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  total = input.required<number>();
  pageSize = model.required<number>();
  pageIndex = model.required<number>();

  showSizeChanger = input<boolean>(true);
  pageSizeOptions = input<number[]>([5, 10, 20, 50]);
  showQuickJumper = input<boolean>(true);
  hideOnSinglePage = input<boolean>(false);
  showTotal = input<boolean>(true);
  totalLabel = input<string>('Total');
}
