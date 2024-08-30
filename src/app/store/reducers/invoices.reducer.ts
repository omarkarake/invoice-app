import { createReducer, on } from '@ngrx/store';
import {
  filterInvoice,
  loadInitialInvoice,
} from '../actions/invoice.action';

const initialState = {
  filteredInvoice: [] as string[],
};
export const invoiceReducer = createReducer(
  initialState,
  on(loadInitialInvoice, (state, { invoice }) => ({ ...state, invoice })),
  on(filterInvoice, (state, { filteredString }) => {
    const index = state.filteredInvoice.indexOf(filteredString);
    let updatedFilteredInvoice;

    if (index > -1) {
      // If the string is already in the array, remove it
      updatedFilteredInvoice = state.filteredInvoice.filter(item => item !== filteredString);
    } else {
      // If the string is not in the array, add it
      updatedFilteredInvoice = [...state.filteredInvoice, filteredString];
    }

    return {
      ...state,
      filteredInvoice: updatedFilteredInvoice,
    };
  }),
);
