import { createReducer, on } from '@ngrx/store';
import {
  addInvoice,
  filterInvoice,
  loadInitialInvoice,
  updateInvoiceStatus,
} from '../actions/invoice.action';
import { Invoice } from '../../models/invoice.model';

const initialState = {
  filteredInvoice: [] as string[],
  invoice: [] as Invoice[],
};
export const invoiceReducer = createReducer(
  initialState,
  on(loadInitialInvoice, (state, { invoice }) => ({ ...state, invoice })),
  on(filterInvoice, (state, { filteredString }) => {
    const index = state.filteredInvoice.indexOf(filteredString);
    let updatedFilteredInvoice;

    if (index > -1) {
      // If the string is already in the array, remove it
      updatedFilteredInvoice = state.filteredInvoice.filter(
        (item) => item !== filteredString
      );
    } else {
      // If the string is not in the array, add it
      updatedFilteredInvoice = [...state.filteredInvoice, filteredString];
    }

    return {
      ...state,
      filteredInvoice: updatedFilteredInvoice,
    };
  }),
  on(addInvoice, (state, { invoice }) => {
    return {
      ...state,
      invoice: [...state.invoice, invoice],
    };
  }),
  on(updateInvoiceStatus, (state, { id }) => {
    console.log('paid clicked with id: ', id);
    const updatedInvoice = state.invoice.map((invoice) => {
      if (invoice.id === id) {
        return {
          ...invoice,
          status: 'paid',
        };
      }
      return invoice;
    });

    return {
      ...state,
      invoice: updatedInvoice,
    };
  })
);
