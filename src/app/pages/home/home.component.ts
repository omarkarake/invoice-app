import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
export class HomeComponent {
  invoiceCreateSlide: boolean = false;
  isDroping = false;

  constructor() {}

  newInvoiceTrigger() {
    this.invoiceCreateSlide = !this.invoiceCreateSlide;
    console.log('newInvoiceTrigger');
  }

  closeInvoice() {
    this.invoiceCreateSlide = false;
  }

  toggleDroping() {
    this.isDroping = !this.isDroping;
    console.log('isDroping', this.isDroping);
  }
}
