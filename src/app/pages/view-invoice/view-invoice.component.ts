import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { selectInvoiceById } from '../../store/selectors/invoice.selector';
import { Invoice, Item } from '../../models/invoice.model';
import { Observable, startWith } from 'rxjs';
import {
  deleteInvoice,
  updateInvoiceStatus,
} from '../../store/actions/invoice.action';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css'],
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
  providers: [DatePipe],
})
export class ViewInvoiceComponent implements OnInit, DoCheck {
  invoiceEditSlide: boolean = true;
  isModalOpen = false;
  invoiceId: string | null = null;
  invoice$: Observable<Invoice | null | undefined> | null = null;
  invoiceForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{
      appState: { invoice: Invoice[]; filteredInvoice: string[] };
    }>,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('id');
      if (this.invoiceId) {
        this.invoice$ = this.store
          .select(selectInvoiceById(this.invoiceId))
          .pipe(startWith(null));

        this.invoice$.subscribe((invoice) => {
          if (invoice) {
            this.initializeForm(invoice);
          }
        });
      }
    });
  }

  ngDoCheck(): void {
    console.log('formData: ', this.invoiceForm.value);
  }

  initializeForm(invoice: Invoice) {
    this.invoiceForm = this.fb.group({
      streetAddress: [invoice.senderAddress.street, Validators.required],
      city: [invoice.senderAddress.city, Validators.required],
      postCode: [invoice.senderAddress.postCode, Validators.required],
      country: [invoice.senderAddress.country, Validators.required],
      clientName: [invoice.clientName, Validators.required],
      clientEmail: [invoice.clientEmail, Validators.required],
      ClientstreetAddress: [invoice.clientAddress.street, Validators.required],
      clientCity: [invoice.clientAddress.city, Validators.required],
      clientPostCode: [invoice.clientAddress.postCode, Validators.required],
      clientCountry: [invoice.clientAddress.country, Validators.required],
      InvoiceDate: [invoice.createdAt, Validators.required],
      paymentTerms: [invoice.paymentTerms, Validators.required],
      projectDescription: [invoice.description, Validators.required],
      items: this.fb.array(invoice.items.map((item) => this.createItem(item))),
      status: [invoice.status],
    });
  }

  createItem(item?: Item): FormGroup {
    return this.fb.group({
      itemName: [item ? item.name : '', Validators.required],
      quantity: [
        item ? item.quantity : 0,
        [Validators.required, Validators.min(1)],
      ],
      price: [item ? item.price : 0, [Validators.required, Validators.min(0)]],
      total: [{ value: item ? item.total : 0 }],
    });
  }

  get streetAddressControl(): FormControl {
    return this.invoiceForm.get('streetAddress') as FormControl;
  }

  get cityControl(): FormControl {
    return this.invoiceForm.get('city') as FormControl;
  }

  get postCodeControl(): FormControl {
    return this.invoiceForm.get('postCode') as FormControl;
  }

  get countryControl(): FormControl {
    return this.invoiceForm.get('country') as FormControl;
  }

  get clientNameControl(): FormControl {
    return this.invoiceForm.get('clientName') as FormControl;
  }

  get clientEmailControl(): FormControl {
    return this.invoiceForm.get('clientEmail') as FormControl;
  }

  get clientStreetAdressControl(): FormControl {
    return this.invoiceForm.get('ClientstreetAddress') as FormControl;
  }

  get clientCityControl(): FormControl {
    return this.invoiceForm.get('clientCity') as FormControl;
  }

  get clientPostCodeControl(): FormControl {
    return this.invoiceForm.get('clientPostCode') as FormControl;
  }

  get clientCountryControl(): FormControl {
    return this.invoiceForm.get('clientCountry') as FormControl;
  }

  get invoiceDateControl(): FormControl {
    return this.invoiceForm.get('InvoiceDate') as FormControl;
  }

  get paymentTermsControl(): FormControl {
    return this.invoiceForm.get('paymentTerms') as FormControl;
  }

  get projectDescriptionControl(): FormControl {
    return this.invoiceForm.get('projectDescription') as FormControl;
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  editInvoiceTrigger() {
    // this.invoiceEditSlide = !this.invoiceEditSlide;
  }

  closeInvoice() {
    // this.invoiceEditSlide = false;
  }

  markAsPaid() {
    if (this.invoiceId) {
      this.store.dispatch(updateInvoiceStatus({ id: this.invoiceId }));
    }
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

  deleteInvoice() {
    console.log('deleteInvoice with id: ', this.invoiceId);
    if (this.invoiceId) {
      this.store.dispatch(deleteInvoice({ id: this.invoiceId }));
      this.closeModal();
      this.router.navigate(['/home']);
    }
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  calculateTotal(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = quantity * price;
    item.get('total')?.setValue(total);
  }
}
