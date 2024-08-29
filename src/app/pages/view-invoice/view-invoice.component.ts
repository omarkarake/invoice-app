import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrl: './view-invoice.component.css',
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
export class ViewInvoiceComponent {
  invoiceEditSlide: boolean = false;

  constructor() {}

  editInvoiceTrigger() {
    this.invoiceEditSlide = !this.invoiceEditSlide;
  }

  closeInvoice() {
    this.invoiceEditSlide = false;
  }
}
