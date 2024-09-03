import { createReducer, on } from '@ngrx/store';
import {
  addInvoice,
  deleteInvoice,
  filterInvoice,
  loadInitialInvoice,
  updateInvoiceStatus,
  updateSingleInvoice,
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
  }),
  on(deleteInvoice, (state, { id }) => {
    const updatedInvoice = state.invoice.filter((invoice) => invoice.id !== id);

    return {
      ...state,
      invoice: updatedInvoice,
    };
  }),
  // I want to listen on updateSingleInvoice action and update the invoice state
  // where the id matches invoice in invoice state from the id passed in the action payload
  // will remove everything from the invoice matched and replace it with the new invoice data except the id
  on(updateSingleInvoice, (state, {  updatedInvoice, id }) => {
    const updatedInvoices = state.invoice.map((invoice) => {
      if (invoice.id === id) {
        return {
          ...updatedInvoice,
          id: invoice.id, // Preserve the original ID
        };
      }
      return invoice;
    });
  
    return {
      ...state,
      invoice: updatedInvoices,
    };
  }),
  
);
