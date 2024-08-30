import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import { selectInvoiceState } from '../../store/selectors/invoice.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('out => in', [animate('300ms ease-in')]),
      transition('in => out', [animate('300ms ease-out')]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  invoiceCreateSlide: boolean = false;
  isDroping = false;
  invoices$: Observable<Invoice[]>;
  invoiceDatas: Invoice[] = [];

  constructor(private store: Store<{ appState: { invoice: Invoice[] } }>) {
    this.invoices$ = this.store.select(selectInvoiceState);
  }

  newInvoiceTrigger() {
    this.invoiceCreateSlide = !this.invoiceCreateSlide;
    console.log('newInvoiceTrigger');
  }

  ngOnInit(): void {
    this.invoices$.subscribe((data) => {
      this.invoiceDatas = data;
    });
    console.log('invoiceDatas', this.invoiceDatas);
  }

  closeInvoice() {
    this.invoiceCreateSlide = false;
  }

  toggleDroping() {
    this.isDroping = !this.isDroping;
    console.log('isDroping', this.isDroping);
  }
}
