import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import {
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
import { DatePipe } from '@angular/common';
import { addInvoice } from '../../store/actions/invoice.action';

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
  providers: [DatePipe],
})
export class HomeComponent implements OnInit, DoCheck, OnDestroy {
  invoiceCreateSlide: boolean = false;
  isDroping = false;
  invoices$: Observable<Invoice[]>;
  invoiceDatas: Invoice[] = [];
  parentSubscription: Subscription = new Subscription();

  invoiceForm!: FormGroup;

  constructor(
    private store: Store<{
      appState: { invoice: Invoice[]; filteredInvoice: string[] };
    }>,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.invoices$ = this.store.select(selectInvoiceState);
  }

  newInvoiceTrigger() {
    this.invoiceCreateSlide = true;
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
      paymentTerms: new FormControl(1, Validators.required),
      projectDescription: new FormControl('', Validators.required),
      items: this.fb.array([this.createItem()]),
      status: new FormControl('pending'),
      // Add other form controls as needed
    });
  }

  ngOnDestroy(): void {
      this.parentSubscription.unsubscribe();
  }

  ngDoCheck(): void {
    // console.log('invoiceForm', this.invoiceForm.value);
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
    const quantity = Number(item.get('quantity')?.value) || 0;
    const price = Number(item.get('price')?.value) || 0;
    const total = quantity * price;
    item.get('total')?.setValue(total);
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      // Enable the total fields before extracting the form values
      this.items.controls.forEach((item) => item.get('total')?.enable());
  
      // Generate the ID
      const generatedId = this.generateId();
  
      // Format the dates (assuming you want to use today's date for createdAt and tomorrow's date for paymentDue)
      const createdAt = this.formatDate(new Date());
      const paymentDue = this.calculatePaymentDueDate(
        createdAt,
        this.paymentTermsControl.value
      );
  
      // Map form data to the desired structure
      const formData = {
        id: generatedId,
        createdAt: createdAt,
        paymentDue: paymentDue,
        description: this.projectDescriptionControl.value,
        paymentTerms: this.paymentTermsControl.value,
        clientName: this.clientNameControl.value,
        clientEmail: this.clientEmailControl.value,
        status: this.invoiceForm.get('status')?.value || 'pending', // Default status if not set
        senderAddress: {
          street: this.streetAddressControl.value,
          city: this.cityControl.value,
          postCode: this.postCodeControl.value,
          country: this.countryControl.value,
        },
        clientAddress: {
          street: this.clientStreetAdressControl.value,
          city: this.clientCityControl.value,
          postCode: this.clientPostCodeControl.value,
          country: this.clientCountryControl.value,
        },
        items: this.items.value.map((item: any) => ({
          name: item.itemName,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
        total: this.calculateInvoiceTotal(),
      };
  
      // Disable the total fields again if needed
      this.items.controls.forEach((item) => item.get('total')?.disable());
  
      // Handle form submission
      this.store.dispatch(addInvoice({ invoice: formData }));
      this.discardForm();
    }
  }

  discardForm(): void {
    this.invoiceForm.reset();
    this.closeInvoice();
  }

  closeInvoice() {
    this.invoiceCreateSlide = false;
  }

  toggleDroping() {
    this.isDroping = !this.isDroping;
  }

  generateId(): string {
    const prefix = 'RT'; // You can change this to 'BY', 'RW', etc.
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    return `${prefix}${randomNumber}`;
  }

  private calculatePaymentDueDate(
    createdAt: string,
    paymentTerms: number
  ): string {
    const createdDate = new Date(createdAt);
    createdDate.setDate(createdDate.getDate() + paymentTerms);
    return this.formatDate(createdDate);
  }

  private calculateInvoiceTotal(): number {
    return this.items.value.reduce(
      (sum: number, item: any) => sum + item.total,
      0
    );
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
