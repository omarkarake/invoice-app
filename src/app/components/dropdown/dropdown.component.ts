import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'], // Fix typo here
})
export class DropdownComponent {
  isDroping = false;
  @Input() control: FormControl = new FormControl('');
  selectedPaymentTerm: string = 'Net 1 Days';

  toggleDroping() {
    this.isDroping = !this.isDroping;
  }

  selectPaymentTerm(term: string) {
    this.selectedPaymentTerm = term;
    this.control.setValue(term); // Update the form control value
    this.toggleDroping(); // Close the dropdown after selection
    console.log('Selected Payment Term:', this.selectedPaymentTerm);
  }
}
