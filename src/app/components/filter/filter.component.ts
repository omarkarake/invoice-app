import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  hoverIndex: number | null = null;
  isDroping = false;

  filters = [
    { name: 'Draft', checked: false },
    { name: 'Pending', checked: false },
    { name: 'Paid', checked: false },
  ];

  toggleDroping() {
    this.isDroping = !this.isDroping;
    console.log('isDroping', this.isDroping);
  }

  activateFilter(index: number) {
    this.filters[index].checked = !this.filters[index].checked;
  }

  setHoverIndex(index: number | null) {
    this.hoverIndex = index;
  }
}
