import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';

export const loadInitialInvoice = createAction(
  '[Invoice] Load Initial Invoice',
  props<{ invoice: Invoice[] }>()
);
