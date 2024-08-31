import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-issue-date',
  templateUrl: './issue-date.component.html',
  styleUrls: ['./issue-date.component.css'],
  providers: [DatePipe]
})
export class IssueDateComponent {
  @Input() control: FormControl = new FormControl('');
  isDroping = false;
  selectedDate: string = '';

  constructor(private datePipe: DatePipe) {
    this.selectedDate = this.formatDate(new Date()); // Initialize with today's date formatted
  }

  toggleDroping(picker: any): void {
    this.isDroping = !this.isDroping;
    if (this.isDroping) {
      picker.open();
    } else {
      picker.close();
    }
  }

  onDateSelected(): void {
    this.isDroping = false; // Close the dropdown when a date is selected
    this.selectedDate = this.formatDate(this.control.value);
    // console.log('Selected Date:', this.selectedDate);
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
