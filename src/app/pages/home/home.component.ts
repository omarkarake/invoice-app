import { Component, DoCheck, OnInit } from '@angular/core';
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
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
export class HomeComponent implements OnInit, DoCheck {
  invoiceCreateSlide: boolean = true;
  isDroping = false;
  invoices$: Observable<Invoice[]>;
  invoiceDatas: Invoice[] = [];

  invoiceForm!: FormGroup;

  constructor(
    private store: Store<{
      appState: { invoice: Invoice[]; filteredInvoice: string[] };
    }>,
    private fb: FormBuilder
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

  ngOnInit(): void {
    this.store.select(selectFilteredInvoices).subscribe((data) => {
      this.invoiceDatas = data;
    });
    this.invoiceForm = new FormGroup({
      streetAddress: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      clientEmail: new FormControl('', Validators.required),
      ClientstreetAddress: new FormControl('', Validators.required),
      clientCity: new FormControl('', Validators.required),
      clientPostCode: new FormControl('', Validators.required),
      clientCountry: new FormControl('', Validators.required),
      InvoiceDate: new FormControl('', Validators.required),
      paymentTerms: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      items: this.fb.array([this.createItem()]),
      status: new FormControl(''),
      // Add other form controls as needed
    });
  }

  ngDoCheck(): void {
    console.log('invoiceForm', this.invoiceForm.value);
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
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

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      // Generate the ID
      const generatedId = this.generateId();

      // Add the ID to the form data
      const formData = {
        id: generatedId,
        ...this.invoiceForm.value,
      };

      // Handle form submission
      console.log("formData: ", formData);
    }
  }

  discardForm(): void {
    this.invoiceForm.reset();
  }

  closeInvoice() {
    // this.invoiceCreateSlide = false;
  }

  toggleDroping() {
    this.isDroping = !this.isDroping;
    console.log('isDroping', this.isDroping);
  }

  generateId(): string {
    const prefix = 'RT'; // You can change this to 'BY', 'RW', etc.
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    return `${prefix}${randomNumber}`;
  }
}
