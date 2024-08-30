import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterInvoice } from '../../store/actions/invoice.action';
import { selectFilteredInvoice, selectFilteredInvoices } from '../../store/selectors/invoice.selector';
import { take } from 'rxjs';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  hoverIndex: number | null = null;
  isDroping = false;

  constructor(
    private store: Store<{
      appState: { invoice: Invoice[]; filteredInvoice: string[] };
    }>
  ) {}
  filters = [
    { name: 'draft', checked: false },
    { name: 'pending', checked: false },
    { name: 'paid', checked: false },
  ];

  toggleDroping() {
    this.isDroping = !this.isDroping;
  }

  activateFilter(index: number) {
    this.filters[index].checked = !this.filters[index].checked;
    this.store.dispatch(
      filterInvoice({
        filteredString: this.filters[index].name,
      })
    );
  }

  setHoverIndex(index: number | null) {
    this.hoverIndex = index;
  }
}
