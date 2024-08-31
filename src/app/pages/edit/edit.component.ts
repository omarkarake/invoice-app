import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectInvoiceById } from '../../store/selectors/invoice.selector';
import { Invoice, Item } from '../../models/invoice.model';
import { Observable, startWith } from 'rxjs';
import { updateSingleInvoice } from '../../store/actions/invoice.action';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe],
})
export class EditComponent implements OnInit, DoCheck {
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
    console.log('invoiceForm: ', this.invoiceForm.value);
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
      InvoiceDate: [
        this.datePipe.transform(invoice.createdAt, 'yyyy-MM-dd'),
        Validators.required,
      ],
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
      total: [{ value: item ? Number(item.total) : 0, disabled: true }],
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

  discardForm(): void {
    this.router.navigate(['/home']);
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

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      // Enable the total fields before extracting the form values
      this.items.controls.forEach((item) => item.get('total')?.enable());

      // Format the dates (assuming you want to use today's date for createdAt and tomorrow's date for paymentDue)
      const createdAt = this.invoiceDateControl.value;
      const paymentDue = this.calculatePaymentDueDate(
        createdAt,
        this.paymentTermsControl.value
      );

      // Map form data to the desired structure
      const formData = {
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
      console.log('formData after submission: ', formData);
      this.invoiceId &&
        this.store.dispatch(
          updateSingleInvoice({ updatedInvoice: formData, id: this.invoiceId })
        );
      this.router.navigate(['/home']);
    }
  }
}
