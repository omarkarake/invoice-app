import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Button1Component } from './components/buttons/button1/button1.component';
import { Button2Component } from './components/buttons/button2/button2.component';
import { Button3Component } from './components/buttons/button3/button3.component';
import { Button4Component } from './components/buttons/button4/button4.component';
import { Button5Component } from './components/buttons/button5/button5.component';
import { Button6Component } from './components/buttons/button6/button6.component';
import { TextFieldComponent } from './components/inputs/text-field/text-field.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { IssueDateComponent } from './components/issue-date/issue-date.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { ViewInvoiceComponent } from './pages/view-invoice/view-invoice.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { InvoiceCreationComponent } from './components/invoice-creation/invoice-creation.component';
import { EditComponent } from './components/edit/edit.component';
import { FilterComponent } from './components/filter/filter.component';
import { StoreModule } from '@ngrx/store';
import { invoiceReducer } from './store/reducers/invoices.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    Button1Component,
    Button2Component,
    Button3Component,
    Button4Component,
    Button5Component,
    Button6Component,
    TextFieldComponent,
    DropdownComponent,
    IssueDateComponent,
    HomeComponent,
    ViewInvoiceComponent,
    NavigationComponent,
    InvoiceCreationComponent,
    EditComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'view/:invoice_id', component: ViewInvoiceComponent },
      { path: 'edit/:invoice_id', component: EditComponent },
      { path: 'new/:invoice_id', component: InvoiceCreationComponent },
    ]),
    StoreModule.forRoot({
      appState: invoiceReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
