import { createReducer, on } from '@ngrx/store';
import { loadInitialInvoice } from '../actions/invoice.action';

const initialState = {};
export const invoiceReducer = createReducer(
  initialState,
  on(loadInitialInvoice, (state, { invoice }) => ({ ...state, invoice }))
);
