import { Component, OnInit } from '@angular/core';
import { DarkModeService } from './service/dark-mode/dark-mode.service';
import { InvoicesService } from './service/invoices/invoices.service';
import { Store } from '@ngrx/store';
import { loadInitialInvoice } from './store/actions/invoice.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private darkModeService: DarkModeService,
    private invoiceService: InvoicesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.store.dispatch(loadInitialInvoice({ invoice: data }));
    });
  }

  toggleDarkMode() {
    this.darkModeService.toggleTheme();
  }
}
