import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() text: string = 'input text';
  @Input() isValid: boolean = true;
  @Input() control: FormControl = new FormControl('');

  isTyping = false;
  value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  toggleIsActive() {
    this.isTyping = !this.isTyping;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const value = inputElement.value; // Now TypeScript knows this has a 'value' property
    this.value = value;
    this.onChange(value);
    this.control.setValue(value); // Syncing the control value
  }

  writeValue(value: string | null): void {
    this.value = value || ''; // Handle potential null values
    if (this.control) {
      this.control.setValue(this.value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
