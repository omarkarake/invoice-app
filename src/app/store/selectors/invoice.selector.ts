import { Invoice } from '../../models/invoice.model';

export const selectInvoiceState = (state: { appState: { invoice: Invoice[] } }) =>
  state.appState.invoice;
