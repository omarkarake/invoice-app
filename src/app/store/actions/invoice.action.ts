import { createAction, props } from '@ngrx/store';
import { Invoice, InvoiceToUpdate } from '../../models/invoice.model';

export const loadInitialInvoice = createAction(
  '[Invoice] Load Initial Invoice',
  props<{ invoice: Invoice[] }>()
);

export const filterInvoice = createAction(
  '[Invoice] Filter Invoice',
  props<{ filteredString: string }>()
);

export const addInvoice = createAction(
  '[Invoice] Add Invoice',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceStatus = createAction(
  '[Invoice] Update Invoice Status',
  props<{ id: string }>()
);

export const deleteInvoice = createAction(
  '[Invoice] Delete Invoice',
  props<{ id: string }>()
);

export const updateSingleInvoice = createAction(
  '[Invoice] Update Single Invoice',
  props<{ updatedInvoice: InvoiceToUpdate, id: string }>()
);
