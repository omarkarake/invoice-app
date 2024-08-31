import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-issue-date',
  templateUrl: './issue-date.component.html',
  styleUrls: ['./issue-date.component.css'],
  providers: [DatePipe]
})
export class IssueDateComponent implements OnInit {
  @Input() control: FormControl = new FormControl('');
  isDroping = false;
  selectedDate: string = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    // Initialize selectedDate based on the control value or current date
    const initialDate = this.control.value ? new Date(this.control.value) : new Date();
    this.selectedDate = this.formatDate(initialDate);
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