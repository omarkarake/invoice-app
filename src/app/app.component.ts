import { Component, OnDestroy, OnInit } from '@angular/core';
import { DarkModeService } from './service/dark-mode/dark-mode.service';
import { InvoicesService } from './service/invoices/invoices.service';
import { Store } from '@ngrx/store';
import { loadInitialInvoice } from './store/actions/invoice.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  parentSubscription: Subscription = new Subscription();
  constructor(
    private darkModeService: DarkModeService,
    private invoiceService: InvoicesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.parentSubscription.add(
      this.invoiceService.getInvoices().subscribe((data) => {
        this.store.dispatch(loadInitialInvoice({ invoice: data }));
      })
    );
  }

  ngOnDestroy(): void {
    this.parentSubscription.unsubscribe();
  }

  toggleDarkMode() {
    this.darkModeService.toggleTheme();
  }
}
