import { NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { ViewInvoiceComponent } from './pages/view-invoice/view-invoice.component';
import { NavigationComponent } from './components/navigation/navigation.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'view/:invoice_id', component: ViewInvoiceComponent },
    ]),
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
