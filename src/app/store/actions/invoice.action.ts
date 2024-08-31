import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';

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
