import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { selectInvoiceById } from '../../store/selectors/invoice.selector';
import { Invoice } from '../../models/invoice.model';
import { Observable, startWith } from 'rxjs';

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
export class ViewInvoiceComponent implements OnInit {
  invoiceEditSlide: boolean = false;
  isModalOpen = false;
  invoiceId: string | null = null;
  invoice$: Observable<Invoice | null | undefined> | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{
      appState: { invoice: Invoice[]; filteredInvoice: string[] };
    }>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('id');
      if (this.invoiceId) {
        this.invoice$ = this.store
          .select(selectInvoiceById(this.invoiceId))
          .pipe(startWith(null)); // This ensures the observable starts with null
      }
    });
  }

  editInvoiceTrigger() {
    this.invoiceEditSlide = !this.invoiceEditSlide;
  }

  closeInvoice() {
    this.invoiceEditSlide = false;
  }

  openModal() {
    this.isModalOpen = true;
    setTimeout(() => {
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.classList.add('show-modal');
      }
    }, 10); // Delay to trigger the animation
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.remove('show-modal');
    }
    setTimeout(() => {
      this.isModalOpen = false;
    }, 300); // Match the transition duration
  }
}
