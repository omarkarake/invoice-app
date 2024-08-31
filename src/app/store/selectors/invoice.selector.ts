import { Invoice } from '../../models/invoice.model';

export const selectInvoiceState = (state: {
  appState: { invoice: Invoice[] };
}) => state.appState.invoice;

export const selectFilteredInvoice = (state: {
  appState: { filteredInvoice: string[] };
}) => state.appState.filteredInvoice;

export const selectFilteredInvoices = (state: {
  appState: { invoice: Invoice[]; filteredInvoice: string[] };
}) => {
  // If no filters are selected, return all invoices
  if (
    !state.appState.filteredInvoice ||
    state.appState.filteredInvoice.length === 0
  ) {
    return state.appState.invoice;
  }

  // Filter invoices based on the selected statuses
  const filteredInvoices = state.appState.invoice.filter((invoice) => {
    return state.appState.filteredInvoice.includes(invoice.status);
  });

  return filteredInvoices;
};

export const selectInvoiceById =
  (id: string) => (state: { appState: { invoice: Invoice[] } }) => {
    return state.appState.invoice.find((invoice) => invoice.id === id);
  };
