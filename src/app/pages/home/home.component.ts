import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Observable, take } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import {
  selectFilteredInvoice,
  selectFilteredInvoices,
  selectInvoiceState,
} from '../../store/selectors/invoice.selector';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  invoiceCreateSlide: boolean = true;
  isDroping = false;
  invoices$: Observable<Invoice[]>;
  invoiceDatas: Invoice[] = [];

  invoiceForm!: FormGroup;

  constructor(
    private store: Store<{
      appState: { invoice: Invoice[]; filteredInvoice: string[] };
    }>
  ) {
    this.invoices$ = this.store.select(selectInvoiceState);
  }

  newInvoiceTrigger() {
    // this.invoiceCreateSlide = !this.invoiceCreateSlide;
    console.log('newInvoiceTrigger');
  }

  // Getter for streetAddress FormControl
  get streetAddressControl(): FormControl {
    return this.invoiceForm.get('streetAddress') as FormControl;
  }

  ngOnInit(): void {
    this.store.select(selectFilteredInvoices).subscribe((data) => {
      this.invoiceDatas = data;
    });
    this.invoiceForm = new FormGroup({
      streetAddress: new FormControl('', Validators.required),
      // Add other form controls as needed
    });
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      // Handle form submission
      console.log(this.invoiceForm.value);
    }
  }

  closeInvoice() {
    // this.invoiceCreateSlide = false;
  }

  toggleDroping() {
    this.isDroping = !this.isDroping;
    console.log('isDroping', this.isDroping);
  }
}
