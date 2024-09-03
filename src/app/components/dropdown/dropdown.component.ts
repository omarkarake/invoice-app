import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  isDroping = false;
  @Input() control: FormControl = new FormControl('');
  selectedPaymentTerm: number = 1; // Default to 1 day

  paymentTerms = [
    { label: 'Net 1 Day', value: 1 },
    { label: 'Net 7 Days', value: 7 },
    { label: 'Net 14 Days', value: 14 },
    { label: 'Net 30 Days', value: 30 },
  ];

  ngOnInit(): void {
    // Initialize selectedPaymentTerm based on the control value or default to 1
    this.selectedPaymentTerm = this.control.value || 1;
  }

  toggleDroping() {
    this.isDroping = !this.isDroping;
  }

  selectPaymentTerm(termValue: number) {
    this.selectedPaymentTerm = termValue;
    this.control.setValue(termValue); // Update the form control value with the number
    this.toggleDroping(); // Close the dropdown after selection
  }

  getSelectedLabel(): string {
    return this.paymentTerms.find(term => term.value === this.selectedPaymentTerm)?.label || '';
  }
}